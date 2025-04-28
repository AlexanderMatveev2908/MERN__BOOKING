// import Stripe from "stripe";
// import { formatDateForUser } from "./formatDate";
// import { UserType } from "../models/User";
// import { BookingType } from "../models/Booking";

// export const makeLineItems = (
//   checkIn: string,
//   checkOut: string,
//   hotel: any,
//   totNights: number
// ) => [
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: `Booking ${hotel.name}`,
//         description: `${totNights} ${totNights > 1 ? "Nights" : "Night"} at ${
//           hotel.name
//         }, from ${formatDateForUser(checkIn)} to ${formatDateForUser(
//           checkOut
//         )}`,
//         images: hotel.images?.[0]?.url?.startsWith("http")
//           ? [hotel.images[0].url]
//           : [],
//       },
//       unit_amount: hotel.pricePerNight * 100,
//     },
//     quantity: totNights,
//   },
// ];

// export const makeSession = async (
//   stripe: Stripe,
//   line_items: any,
//   user: UserType,
//   newBooking: BookingType
// ) =>
//   await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items,
//     customer_email: user.email,
//     client_reference_id: newBooking._id + "",
//     mode: "payment",
//     success_url: `${
//       process.env.NODE_ENV === "development"
//         ? process.env.FRONT_URL_DEV
//         : process.env.FRONT_URL
//     }/guest/verify-booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${
//       process.env.NODE_ENV === "development"
//         ? process.env.FRONT_URL_DEV
//         : process.env.FRONT_URL
//     }/guest/verify-booking?success=false&bookingId=${newBooking._id + ""}`,
//   });
