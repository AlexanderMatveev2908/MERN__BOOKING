import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { formatDateForUTC } from "../../utils/formatDate";

const isValidDate = (d: string) => !isNaN(new Date(d).getTime());

export const validateBooking = [
  param("hotelId")
    .custom((val) => mongoose.Types.ObjectId.isValid(val))
    .withMessage("Invalid hotel ID"),
  // body("hotelId")
  //   .custom((val) => mongoose.Types.ObjectId.isValid(val))
  //   .withMessage("Invalid hotel ID"),

  body("adultCount")
    .toInt()
    .isInt({ gt: 0 })
    .withMessage("Adult count must be a positive integer"),

  body("childCount")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Child count must be a non-negative integer"),

  body("checkIn").custom(isValidDate).withMessage("Invalid check-in date"),

  body("checkOut").custom(isValidDate).withMessage("Invalid check-out date"),

  body("checkIn")
    .custom(
      (val, { req }) =>
        formatDateForUTC(val).getTime() <=
        formatDateForUTC(req.body.checkOut).getTime()
    )
    .withMessage("Check-in date must be smaller than check-out date"),

  (req: Request, res: Response, next: NextFunction): any => {
    const errs = validationResult(req);

    console.log(errs);

    if (!errs.isEmpty())
      return res.status(400).json({ success: false, errs: errs.array() });

    next();
  },
];
