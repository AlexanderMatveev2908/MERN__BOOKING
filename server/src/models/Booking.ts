import mongoose from "mongoose";

export type BookingType = {
  _id: string;
  hotelId: string;
  userId: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
  pricePerNight: number;
  totalNights: number;
  totalPrice: number;
  status: "pending" | "confirmed";
  // stripe_session_id: string | null;
  paymentIntentId: string | null;
};

export type BookingTypeForMongo = Omit<
  BookingType,
  "userId" | "hotelId" | "_id"
> & {
  userId: mongoose.Schema.Types.ObjectId;
  hotelId: mongoose.Schema.Types.ObjectId;
};

const BookingSchema = new mongoose.Schema<BookingTypeForMongo>(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalNights: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    // stripe_session_id: {
    //   type: String,
    //   default: null,
    //   required: false,
    // },
    paymentIntentId: {
      type: String,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking ||
  mongoose.model<BookingTypeForMongo>("Booking", BookingSchema);

export default Booking;
