import mongoose from "mongoose";
import { BookingType, BookingTypeForMongo } from "./Booking";

export type ImageType = {
  _id?: string;
  url: string;
  public_id: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  images: ImageType[];
  bookings: BookingType[];
  createdAt: Date;
  lastUpdated: Date;
};

type HotelForMongo = Omit<HotelType, "userId" | "bookings"> & {
  userId: mongoose.Schema.Types.ObjectId;
  bookings: BookingTypeForMongo[];
};

const HotelSchema = new mongoose.Schema<HotelForMongo>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  images: {
    type: [
      {
        url: String,
        public_id: String,
      },
    ],
    required: true,
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Hotel =
  mongoose.models.Hotel || mongoose.model<HotelForMongo>("Hotel", HotelSchema);

export default Hotel;
