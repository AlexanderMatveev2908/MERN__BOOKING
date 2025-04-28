import { HotelFetchedType } from "./hotels";

type User = {
  [key: string]: string;
};

export type BookingFetchedType = {
  _id: string;
  hotelId: string;
  hotel: HotelFetchedType;
  userId: string;
  user?: User;
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
};

export type PaymentIntentType = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
  success: boolean;
};
