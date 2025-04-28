import { Request, Response } from "express";
import Stripe from "stripe";
import { formatDateForUTC } from "../utils/formatDate";
import { calcAvGuests, calcPagination } from "../utils/hotelsUtils";
import User from "../models/User";
import Booking, { BookingType } from "../models/Booking";
import { sendEmailAfterBooking } from "../utils/sendEmail";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_KEY!);
export const createPayment = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { checkIn, checkOut, adultCount, childCount } = req.body;
  const { hotelId } = req.params;

  const hotelArr = await calcAvGuests(hotelId, checkIn, checkOut);

  const hotel = hotelArr?.[0];
  if (!hotel)
    return res.status(404).json({ msg: "Hotel not found", success: false });

  if (
    hotel.availableAdults < adultCount ||
    hotel.availableChildren < childCount
  )
    return res
      .status(400)
      .json({ msg: "Hotel is not available", success: false });

  const user = await User.findById(userId).select("email _id");
  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  const totNights = Math.ceil(
    (formatDateForUTC(checkOut).getTime() -
      formatDateForUTC(checkIn).getTime()) /
      86400000
  );

  const totalCost = +(hotel.pricePerNight * totNights).toFixed(2);

  let paymentIntent;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        hotelId: hotel._id + "",
        userId: user._id + "",
        checkIn: formatDateForUTC(checkIn).toISOString(),
        checkOut: formatDateForUTC(checkOut).toISOString(),
        adultCount,
        childCount,
        totalNights: totNights + "",
        totalPrice: totalCost + "",
        pricePerNight: hotel.pricePerNight + "",
      },
    });

    return res.status(201).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret + "",
      totalCost,
    });
  } catch (err: any) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Error creating payment intent", success: false });
  }
};

export const webhook = async (req: Request, res: Response): Promise<any> => {
  const sig = req.headers["stripe-signature"];

  if (!sig)
    return res.status(400).json({ success: false, msg: "invalid signature" });

  let e;

  try {
    e = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.NODE_ENV === "development"
        ? process.env.STRIPE_WEBHOOK_KEY_DEV!
        : process.env.STRIPE_WEBHOOK_KEY!
    );
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ success: false, msg: "invalid signature" });
  }

  const paymentIntent = e.data.object as Stripe.PaymentIntent;

  try {
    const user = await User.findById(paymentIntent.metadata.userId).select(
      "email _id"
    );

    const sendEmailHigher = (status: string) =>
      sendEmailAfterBooking({
        status,
        to: user?.email ?? "",
      });

    switch (e.type) {
      case "payment_intent.succeeded": {
        await Booking.create({
          hotelId: paymentIntent.metadata.hotelId,
          userId: paymentIntent.metadata.userId,
          adultCount: +paymentIntent.metadata.adultCount,
          childCount: +paymentIntent.metadata.childCount,
          checkIn: new Date(paymentIntent.metadata.checkIn),
          checkOut: new Date(paymentIntent.metadata.checkOut),
          totalNights: +paymentIntent.metadata.totalNights,
          totalPrice: +paymentIntent.metadata.totalPrice,
          pricePerNight: +paymentIntent.metadata.pricePerNight,
          status: "confirmed",
          paymentIntentId: paymentIntent.id,
        });

        await sendEmailHigher("paid");

        break;
      }
      case "payment_intent.payment_failed": {
        await sendEmailHigher("failed");

        break;
      }
    }
  } catch (err: any) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Error processing payment", success: false });
  }

  return res.status(200).json({ success: true });
};

export const getBookingForPolling = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { paymentIntentId } = req.query;

  if (!paymentIntentId)
    return res.status(404).json({ msg: "invalid intent", success: false });

  const booking = await Booking.findOne({ paymentIntentId });
  if (!booking)
    return res.status(404).json({ msg: "Booking not found", success: false });

  return res.status(200).json({ success: true, booking });
};

export const getBookingsAsUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { skipNum, limitNum } = calcPagination(req);

  const bookings = await Booking.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "hotels",
        localField: "hotelId",
        foreignField: "_id",
        as: "hotel",
      },
    },
    {
      $unwind: "$hotel",
    },
    ...(skipNum !== undefined && limitNum > 0
      ? [
          {
            $facet: {
              metadata: [{ $count: "total" }],
              data: [{ $skip: skipNum }, { $limit: limitNum }],
            },
          },
        ]
      : []),
  ]);

  if (!bookings[0].data?.length)
    return res.status(200).json({ msg: "No bookings found", success: false });

  const totBookings = bookings[0].metadata[0].total;
  const totPages = Math.max(Math.ceil(totBookings / limitNum), 1);
  const paginated = bookings[0].data;

  return res
    .status(200)
    .json({ success: true, bookings: paginated, totBookings, totPages });
};

export const getBookingsAsAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const { skipNum, limitNum } = calcPagination(req);

  const bookings = await Booking.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "hotels",
        localField: "hotelId",
        foreignField: "_id",
        as: "hotel",
      },
    },
    {
      $unwind: "$hotel",
    },
    {
      $match: {
        "hotel.userId": new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
        "user.password": 0,
        "user.isVerified": 0,
        "user.verificationToken": 0,
        "user.expiryVerificationToken": 0,
        "user.changePwdToken": 0,
        "user.expiryChangePwdToken": 0,
      },
    },
    ...(skipNum !== undefined && limitNum > 0
      ? [
          {
            $facet: {
              metadata: [{ $count: "total" }],
              data: [{ $skip: skipNum }, { $limit: limitNum }],
            },
          },
        ]
      : []),
  ]);

  if (!bookings[0].metadata[0]?.total)
    return res.status(200).json({ msg: "No bookings found", success: false });

  const totBookings = bookings[0].metadata[0].total;
  const totPages = Math.max(Math.ceil(totBookings / limitNum), 1);
  const paginated = bookings[0].data;

  return res
    .status(200)
    .json({ success: true, bookings: paginated, totBookings, totPages });
};

export const refundBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { bookingId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookingId))
    return res.status(400).json({ msg: "Invalid booking id", success: false });

  const bookingArr: any[] = await Booking.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(bookingId) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        "user.password": 0,
        "user.isVerified": 0,
        "user.verificationToken": 0,
        "user.expiryVerificationToken": 0,
        "user.changePwdToken": 0,
        "user.expiryChangePwdToken": 0,
      },
    },
  ]);

  const booking = bookingArr?.[0];

  if (!booking)
    return res.status(404).json({ msg: "Booking not found", success: false });

  // if (
  //   new Date().setUTCHours(10, 0, 0, 0) >=
  //   new Date(booking.checkIn).getTime() - 86400000
  // )
  //   return res
  //     .status(400)
  //     .json({ msg: "Check-In is too close", success: false });

  const refund = await stripe.refunds.create({
    payment_intent: booking.paymentIntentId!,
  });

  if (refund.status !== "succeeded")
    return res.status(400).json({
      msg: `Refund Failed`,
      success: false,
    });

  await sendEmailAfterBooking({ to: booking?.user?.email, status: "deleted" });

  await Booking.findByIdAndDelete(bookingId);

  return res.status(200).json({ success: true, refund });
};

// export const verifyBooking = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { hotelId, paymentIntentId } = req.body;
//   const { userId } = req;

//   const paymentIntent = await stripe.paymentIntents.retrieve(
//     paymentIntentId as string
//   );
//   if (!paymentIntent)
//     return res
//       .status(404)
//       .json({ msg: "Payment intent not found", success: false });

//   if (
//     paymentIntent?.metadata?.hotelId !== hotelId ||
//     paymentIntent?.metadata?.userId !== userId
//   )
//     return res
//       .status(400)
//       .json({ msg: "Invalid payment intent", success: false });

//   if (paymentIntent.status !== "succeeded")
//     return res.status(400).json({
//       msg: `Payment intent not succeeded Status: ${paymentIntent.status}`,
//       success: false,
//     });

//   const existingBooking = await Booking.findOne({
//     hotelId: new mongoose.Types.ObjectId(hotelId),
//   });
//   if (!existingBooking)
//     return res.status(404).json({ msg: "Booking not found", success: false });

//   return res.status(200).json({ success: true, booking: existingBooking });
// };
