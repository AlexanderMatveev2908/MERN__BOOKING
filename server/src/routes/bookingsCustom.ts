import express from "express";
import { validateBooking } from "../middleware/bookings/validateBooking";
import asyncWrapper from "../middleware/general/asyncWrapper";
import {
  createPayment,
  getBookingForPolling,
  getBookingsAsAdmin,
  getBookingsAsUser,
  refundBooking,
} from "../controllers/bookingCustomControllers";
import { verifyAccessTokenMiddleware } from "../middleware/general/validateAccessToken";
import { validateVerifyBooking } from "../middleware/bookings/validateVerifyBooking";

const router = express.Router();

router.post(
  "/:hotelId/payment-intent",
  verifyAccessTokenMiddleware,
  validateBooking,
  asyncWrapper(createPayment)
);

router.get(
  "/status/polling",
  verifyAccessTokenMiddleware,
  asyncWrapper(getBookingForPolling)
);

router.get(
  "/guest",
  verifyAccessTokenMiddleware,
  asyncWrapper(getBookingsAsUser)
);

router.get(
  "/admin",
  verifyAccessTokenMiddleware,
  asyncWrapper(getBookingsAsAdmin)
);

router.delete(
  "/refund/:bookingId",
  verifyAccessTokenMiddleware,
  asyncWrapper(refundBooking)
);

// router.post(
//   "/verify-booking",
//   verifyAccessTokenMiddleware,
//   validateVerifyBooking,
//   asyncWrapper(verifyBooking)
// );

export default router;
