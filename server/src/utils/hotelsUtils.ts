import mongoose from "mongoose";
import Hotel, { HotelType } from "../models/Hotel";

import { Request } from "express";
import { formatDateForUTC } from "./formatDate";

export const calcPagination = (req: Request) => {
  const { page = "1", limit = "5" } = req.query;

  const limitNum = Math.max(parseInt(limit as string, 10), 1);
  const currPage = Math.max(parseInt(page as string, 10), 1);
  const skipNum = (currPage - 1) * limitNum;

  return { skipNum, limitNum };
};

export const makeQuery = (req: Request) => {
  const {
    starRating,
    facilities,
    types,
    minPricePerNight,
    maxPricePerNight,
    destination,
    adultCount = "1",
    childCount = "0",
  } = req.query;

  const query: any = {
    adultCount: { $gte: +adultCount },
    childCount: { $gte: +childCount },
  };
  if (destination)
    query.$or = [
      { country: new RegExp(destination as string, "i") },
      { city: new RegExp(destination as string, "i") },
      { name: new RegExp(destination as string, "i") },
    ];
  if (starRating) {
    const starRatingArr = (starRating as string)
      .split(",")
      ?.map((el) => +el)
      .filter((el) => !!el);

    if (starRatingArr?.length) query.starRating = { $in: starRatingArr };
  }
  if (facilities) {
    const facilitiesArr = (facilities as string).split(",");
    if (facilitiesArr?.length) query.facilities = { $all: facilitiesArr };
  }
  if (types) {
    const typesArr = (types as string).split(",");
    if (typesArr?.length) query.type = { $in: typesArr };
  }
  if (minPricePerNight || maxPricePerNight) {
    query.pricePerNight = {};
    if (minPricePerNight) query.pricePerNight.$gte = +minPricePerNight;
    if (maxPricePerNight) query.pricePerNight.$lte = +maxPricePerNight;
  }

  return query;
};

export const makeSort = (req: Request) => {
  const { sorterPrice, sorterStars } = req.query;

  const sortObj: any = {};

  if (sorterPrice) sortObj.pricePerNight = sorterPrice === "asc" ? 1 : -1;
  if (sorterStars) sortObj.starRating = sorterStars === "asc" ? 1 : -1;

  return sortObj;
};

export const calcAvGuests = async (
  hotelId: string,
  checkIn: string,
  checkOut: string,
  userId?: string
) =>
  await Hotel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(hotelId) } },
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
        ...(userId
          ? {
              isAdmin: {
                $eq: ["$userId", new mongoose.Types.ObjectId(userId)],
              },
            }
          : {}),
      },
    },
    // {
    //   $project: {
    //     bookings: 0,
    //     filteredBookings: 0,
    //   },
    // },
  ]);

// export const calcAvailableGuests = ({
//   hotels,
//   req,
// }: {
//   hotels: HotelType[];
//   req: Request;
// }): HotelType[] => {
//   const {
//     checkIn = new Date().toISOString(),
//     checkOut = new Date(
//       new Date().setDate(new Date().getDate() + 1)
//     ).toISOString(),
//   } = req.query;

//   return hotels.map((hotel: any) => {
//     let availableAdults = hotel.adultCount;
//     let availableChildren = hotel.childCount;

//     if (hotel.bookings?.length) {
//       hotel.bookings.forEach((booking: BookingType) => {
//         if (
//           booking.checkOut > new Date(checkIn as string) &&
//           booking.checkIn < new Date(checkOut as string)
//         ) {
//           availableAdults -= booking.adultCount;
//           availableChildren -= booking.childCount;
//         }
//       });
//     }
//     return {
//       ...hotel,
//       availableAdults: Math.max(availableAdults, 0),
//       availableChildren: Math.max(availableChildren, 0),
//     };
//   });
// };
