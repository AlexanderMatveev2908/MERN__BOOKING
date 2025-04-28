import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

const isValidDate = (d: string) => !isNaN(new Date(d).getTime());

const isValidPaymentId = (val: string) => /^pi_[A-Za-z0-9]+$/.test(val);

export const validateBookingComplete = [
  param("hotelId")
    .custom((val) => mongoose.Types.ObjectId.isValid(val))
    .withMessage("Invalid hotel ID"),
  // body("hotelId")
  //   .custom((val) => mongoose.Types.ObjectId.isValid(val))
  //   .withMessage("Invalid hotel ID"),

  body("paymentIntentId")
    .custom(isValidPaymentId)
    .withMessage("Invalid payment ID"),

  body("adultCount")
    .isInt({ gt: 0 })
    .withMessage("Adult count must be a positive integer"),

  body("childCount")
    .isInt({ min: 0 })
    .withMessage("Child count must be a non-negative integer"),

  body("checkIn").custom(isValidDate).withMessage("Invalid check-in date"),

  body("checkOut").custom(isValidDate).withMessage("Invalid check-out date"),

  body("checkIn")
    .custom(
      (val, { req }) =>
        new Date(val).getTime() <= new Date(req.body.checkOut).getTime()
    )
    .withMessage("Check-in date must be smaller than check-out date"),

  (req: Request, res: Response, next: NextFunction): any => {
    const errs = validationResult(req);

    if (!errs.isEmpty())
      return res.status(400).json({ success: false, errs: errs.array() });

    next();
  },
];
