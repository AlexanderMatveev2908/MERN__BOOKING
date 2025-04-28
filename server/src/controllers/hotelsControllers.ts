import { Request, Response } from "express";
import Hotel, { HotelType } from "../models/Hotel";
import {
  calcAvGuests,
  calcPagination,
  makeQuery,
  makeSort,
} from "../utils/hotelsUtils";
import mongoose from "mongoose";
import { formatDateForUTC } from "../utils/formatDate";

export const getSearchedHotels = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const {
    checkIn = new Date().toISOString(),
    checkOut = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
  } = req.query;

  const { skipNum, limitNum } = await calcPagination(req);
  const query: any = makeQuery(req);
  const sortObj = makeSort(req);

  const totHotels = await Hotel.countDocuments(query);

  const hotels = await Hotel.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "hotelId",
        as: "bookings",
      },
    },
    {
      $set: {
        filteredBookings: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $and: [
                {
                  $gt: [
                    "$$booking.checkOut",
                    formatDateForUTC(checkIn as string),
                  ],
                },
                {
                  $lt: [
                    "$$booking.checkIn",
                    formatDateForUTC(checkOut as string),
                  ],
                },
                {
                  $eq: ["$$booking.status", "confirmed"],
                },
              ],
            },
          },
        },
      },
    },
    {
      $set: {
        totalBookedAdults: {
          $sum: {
            $map: {
              input: "$filteredBookings",
              as: "booking",
              in: { $ifNull: ["$$booking.adultCount", 0] },
            },
          },
        },
        totalBookedChildren: {
          $sum: {
            $map: {
              input: "$filteredBookings",
              as: "booking",
              in: { $ifNull: ["$$booking.childCount", 0] },
            },
          },
        },
      },
    },
    {
      $set: {
        availableAdults: {
          $max: [
            {
              $subtract: [
                "$adultCount",
                { $ifNull: ["$totalBookedAdults", 0] },
              ],
            },
            0,
          ],
        },
        availableChildren: {
          $max: [
            {
              $subtract: [
                "$childCount",
                { $ifNull: ["$totalBookedChildren", 0] },
              ],
            },
            0,
          ],
        },
        isAdmin: {
          $eq: ["$userId", new mongoose.Types.ObjectId(userId)],
        },
      },
    },
    ...(Object.keys(sortObj ?? {})?.length ? [{ $sort: sortObj }] : []),
    { $skip: skipNum },
    { $limit: limitNum },
    {
      $project: {
        bookings: 0,
        filteredBookings: 0,
      },
    },
  ]);

  const totalPages = Math.max(Math.ceil(totHotels / limitNum), 1);

  if (!hotels)
    return res.status(200).json({ msg: "No hotels found", success: false });

  return res.status(200).json({
    nHits: hotels.length,
    totHotels,
    totalPages,
    hotels: hotels,
    success: true,
  });
};

export const getSingleHotel = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { id } = req.params;
  const { checkIn, checkOut } = req.query;

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ msg: "invalid hotel id", success: false });

  let hotel;

  if (checkIn && checkOut) {
    const hotels = await calcAvGuests(
      id,
      checkIn as string,
      checkOut as string,
      userId
    );

    hotel = hotels[0];
  } else {
    hotel = await Hotel.findById<HotelType>(id).lean().select("-bookings");
  }

  if (!hotel)
    return res.status(404).json({ msg: "Hotel not found", success: false });

  return res.status(200).json({
    success: true,
    hotel,
  });
};

export const getLatestHotels = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { limit = "10" } = req.query;

  const hotels = await Hotel.aggregate([
    {
      $set: {
        isAdmin: {
          $eq: ["$userId", new mongoose.Types.ObjectId(userId)],
        },
      },
    },
    {
      $facet: {
        latest: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
  ]);

  if (!hotels[0].latest.length)
    return res.status(200).json({ msg: "No hotels found", success: false });

  return res.status(200).json({
    success: true,
    hotels: hotels[0].latest,
  });
};

// export const getSearchedHotels = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { skipNum, limitNum } = await calcPagination(req);
//   const query: any = makeQuery(req);
//   const sortObj = makeSort(req);

//   await Booking.find({});

//   const totHotels = await Hotel.countDocuments(query);
//   const priceRange = await Hotel.aggregate([
//     // { $match: query },
//     {
//       $group: {
//         _id: null,
//         minPrice: { $min: "$pricePerNight" },
//         maxPrice: { $max: "$pricePerNight" },
//       },
//     },
//   ]);
//   const minPrice = priceRange[0]?.minPrice ?? 0;
//   const maxPrice = priceRange[0]?.maxPrice ?? 1000;

//   const hotels = await Hotel.find(query)
//     .populate("bookings")
//     .sort(sortObj)
//     .skip(skipNum)
//     .limit(limitNum)
//     .lean();

//   const totalPages = Math.max(Math.ceil(totHotels / limitNum), 1);

//   if (!hotels)
//     return res.status(200).json({ msg: "No hotels found", success: false });

//   const updatedHotels: HotelType[] = calcAvailableGuests({
//     hotels,
//     req,
//   } as any);

//   return res.status(200).json({
//     nHits: updatedHotels.length,
//     totHotels,
//     totalPages,
//     minPrice,
//     maxPrice,
//     hotels: updatedHotels,
//     success: true,
//   });
// };

// export const getSingleHotel = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { userId } = req;
//   const { id } = req.params;
//   const {
//     checkIn = new Date().toISOString(),
//     checkOut = new Date(Date.now() + 86400000).toISOString(),
//   } = req.query;

//   if (!id || !mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).json({ msg: "invalid hotel id", success: false });

//   const hotel = await Hotel.findById<HotelType>(id).populate("bookings").lean();
//   if (!hotel)
//     return res.status(404).json({ msg: "Hotel not found", success: false });

//   let availableAdults = hotel.adultCount;
//   let availableChildren = hotel.childCount;

//   const bookings = await Booking.aggregate([
//     {
//       $match: {
//         hotelId: hotel._id,
//         checkIn: { $lt: new Date(checkOut as string) },
//         checkOut: { $gt: new Date(checkIn as string) },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totAdults: { $sum: "$adultCount" },
//         totChildren: { $sum: "$childCount" },
//       },
//     },
//   ]);

//   if (bookings?.length) {
//     availableAdults -= bookings[0].totAdults;
//     availableChildren -= bookings[0].totChildren;
//   }

//   const isAdmin = userId && hotel.userId + "" === userId;

//   return res.status(200).json({
//     success: true,
//     hotel: {
//       ...hotel,
//       availableAdults,
//       availableChildren,
//     },
//     isAdmin,
//   });
// };
