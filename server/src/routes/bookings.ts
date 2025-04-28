// import express from "express";
// import { verifyAccessTokenMiddleware } from "../middleware/general/validateAccessToken";
// import asyncWrapper from "../middleware/general/asyncWrapper";
// import { bookHotel, verifyBooking } from "../controllers/bookingControllers";
// import { validateBooking } from "../middleware/bookings/validateBooking";
// import { rateLimiterBooking } from "../middleware/bookings/rateLimiterBooking";

// const router = express.Router();

// router.post(
//   "/",
//   verifyAccessTokenMiddleware,
//   validateBooking,
//   rateLimiterBooking,
//   asyncWrapper(bookHotel)
// );
// router.get("/verify", verifyAccessTokenMiddleware, asyncWrapper(verifyBooking));

// export default router;
