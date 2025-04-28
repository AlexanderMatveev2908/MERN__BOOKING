// import { Request, Response } from "express";
// import { calcAvGuests } from "../utils/hotelsUtils";
// import Booking from "../models/Booking";
// import Stripe from "stripe";
// import { formatDateForUTC } from "../utils/formatDate";
// import User from "../models/User";
// import { sendEmailAfterBooking } from "../utils/sendEmail";
// import { makeLineItems, makeSession } from "../utils/stripe";
// import mongoose from "mongoose";

// const stripe = new Stripe(process.env.STRIPE_KEY!);

// export const bookHotel = async (req: Request, res: Response): Promise<any> => {
//   const { userId } = req;
//   const { hotelId, adultCount, childCount, checkIn, checkOut } = req.body;

//   const hotelArr = await calcAvGuests(hotelId, checkIn, checkOut);
//   const hotel = hotelArr?.[0];

//   if (!hotel)
//     return res.status(404).json({ msg: "Hotel not found", success: false });

//   if (
//     hotel.availableAdults < adultCount ||
//     hotel.availableChildren < childCount
//   )
//     return res
//       .status(400)
//       .json({ msg: "Hotel is not available", success: false });

//   const user = await User.findById(userId).select("email _id");
//   if (!user)
//     return res.status(404).json({ msg: "User not found", success: false });

//   const formattedCheckIn = formatDateForUTC(checkIn);
//   const formattedCheckOut = formatDateForUTC(checkOut);
//   const totNights = Math.ceil(
//     (formattedCheckOut.getTime() - formattedCheckIn.getTime()) / 86400000
//   );

//   let booking;

//   const existingBooking = await Booking.findOne({
//     hotelId,
//     userId,
//     checkIn,
//     checkOut,
//   });

//   if (existingBooking) {
//     booking = existingBooking;
//   } else {
//     booking = await Booking.create({
//       hotelId: hotel._id,
//       userId,
//       adultCount,
//       childCount,
//       checkIn: formattedCheckIn,
//       checkOut: formattedCheckOut,
//       pricePerNight: hotel.pricePerNight,
//       totalNights: totNights,
//       totalPrice: parseFloat((totNights * hotel.pricePerNight).toFixed(2)),
//       status: "pending",
//     });
//   }

//   try {
//     const line_items = makeLineItems(checkIn, checkOut, hotel, totNights);

//     const session = await makeSession(stripe, line_items, user, booking);

//     return res.status(201).json({
//       success: true,
//       session,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
//       success: false,
//       stack: err.stack,
//     });
//   }
// };

// export const webhook = async (req: Request, res: Response): Promise<any> => {
//   const sign = req.headers["stripe-signature"];

//   if (!sign)
//     return res
//       .status(400)
//       .json({ success: false, msg: "Stripe signature not found" });

//   let e;

//   try {
//     e = stripe.webhooks.constructEvent(
//       req.body,
//       sign!,
//       process.env.NODE_ENV === "development"
//         ? process.env.STRIPE_WEBHOOK_KEY_DEV!
//         : process.env.STRIPE_WEBHOOK_KEY!
//     );
//   } catch (err: any) {
//     return res.status(400).json({ success: false, msg: err.message });
//   }

//   try {
//     if (
//       e.type === "checkout.session.completed" ||
//       e.type === "checkout.session.expired"
//     ) {
//       const session = e.data.object as Stripe.Checkout.Session;

//       if (!session.client_reference_id)
//         return res.status(400).json({ success: false, msg: "Invalid session" });
//       if (!session.customer_email)
//         return res
//           .status(400)
//           .json({ success: false, msg: "Invalid customer email" });

//       const booking = await Booking.findById(session.client_reference_id);
//       if (!booking)
//         return res.status(400).json({ success: false, msg: "Invalid booking" });

//       const sendEMailHigher = (status: string) =>
//         sendEmailAfterBooking({
//           to: session.customer_email!,
//           status,
//           id: booking._id + "",
//         });

//       if (e.type === "checkout.session.completed") {
//         if (session.payment_status === "paid") {
//           booking.status = "confirmed";
//           sendEMailHigher("paid");
//         }
//       } else if (e.type === "checkout.session.expired") {
//         booking.status = "cancelled";
//         sendEMailHigher("cancelled");
//       }

//       booking.stripe_session_id = session.id;

//       await booking.save();
//     }

//     return res.status(200).json({ success: true });
//   } catch (err: any) {
//     if ((e?.data?.object as Stripe.Checkout.Session)?.client_reference_id) {
//       const booking = await Booking.findById(
//         (e.data.object as Stripe.Checkout.Session).client_reference_id
//       );
//       if (booking) booking.status = "cancelled";
//       await booking.save();
//     }

//     res.status(500).json({
//       msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
//       success: false,
//     });
//   }
// };

// export const verifyBooking = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { session_id, bookingId } = req.query;

//   if (!session_id && !mongoose.Types.ObjectId.isValid(bookingId as string))
//     return res.status(400).json({ msg: "Invalid params", success: false });

//   const query = session_id
//     ? { stripe_session_id: session_id }
//     : { _id: new mongoose.Types.ObjectId(bookingId as string) };

//   const bookingArr = await Booking.aggregate([
//     { $match: query },
//     {
//       $lookup: {
//         from: "users",
//         localField: "userId",
//         foreignField: "_id",
//         as: "userInfo",
//       },
//     },
//     {
//       $unwind: "$userInfo",
//     },
//     {
//       $project: {
//         _id: 1,
//         status: 1,
//         email: "$userInfo.email",
//       },
//     },
//   ]);

//   const booking = bookingArr?.[0];

//   if (!booking)
//     return res.status(404).json({ msg: "Booking not found", success: false });

//   const { email, ...rest } = booking;
//   await sendEmailAfterBooking({
//     to: email,
//     status: rest.status,
//     id: rest._id,
//   });

//   return res.status(200).json({ success: true, booking: rest });
// };
