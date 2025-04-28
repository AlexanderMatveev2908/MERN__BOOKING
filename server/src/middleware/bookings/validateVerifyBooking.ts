import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateVerifyBooking = [
  body("hotelId").isMongoId().withMessage("Invalid hotel ID"),

  body("paymentIntentId").custom((val) =>
    /^pi_[A-Za-z0-9]+$/.test(val as string)
  ),

  (req: Request, res: Response, next: NextFunction): any => {
    const errs = validationResult(req);

    if (!errs.isEmpty())
      return res.status(400).json({ success: false, errs: errs.array() });

    next();
  },
];
