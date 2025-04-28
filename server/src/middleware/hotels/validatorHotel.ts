import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { REG_HOTEL, REG_INT, REG_OPTIONAL_FLOAT } from "../../constants/regex";

const basicFields = ["name", "city", "country", "description", "type"];

export const validatorHotel = [
  ...basicFields.map((field) =>
    check(field)
      .notEmpty()
      .withMessage(`${field} is required`)
      .matches(REG_HOTEL)
      .withMessage(`${field} contain unsafe chars`)
  ),

  check("adultCount")
    .isInt({ min: 1 })
    .withMessage("Adult count must be a number greater than or equal to 1"),

  check("childCount")
    .isInt({ min: 0 })
    .withMessage("Child count must be a number greater than or equal to 0")
    .custom((val, { req }) => {
      if (val && req.body.adultCount < 1)
        throw new Error(
          "If there are children, at least one adult must accompany them"
        );

      return true;
    }),

  check("facilities")
    .notEmpty()
    .withMessage("Facilities is required")
    .custom((val) => {
      if (!Array.isArray(val) && val?.length < 1)
        throw new Error("Facilities must be an array and have at least 1 el");

      if (val.some((item: string) => !REG_HOTEL.test(item))) {
        throw new Error(
          "One or more items in the Facilities array contain unsafe characters"
        );
      }
      return true;
    }),

  check("pricePerNight")
    .notEmpty()
    .withMessage("Price per night is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price per night must not be free")
    .matches(REG_OPTIONAL_FLOAT)
    .withMessage("pricePerNight contain unsafe chars"),

  check("starRating")
    .notEmpty()
    .withMessage("Star rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage(
      "Star rating must be a number greater than or equal to 1 and less than or equal to 5"
    )
    .matches(REG_INT)
    .withMessage("starRating contain unsafe chars"),

  (req: Request, res: Response, next: NextFunction): any => {
    const files = req.files as Express.Multer.File[];
    const existingImages = req.body.images || [];

    if (
      (!files || !Array.isArray(files) || !files?.length) &&
      (!existingImages || !existingImages?.length)
    )
      return res.status(400).json({
        success: false,
        message: "At least one image must be uploaded",
      });

    next();
  },
  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err: any) => ({
          message: err.msg,
          param: err.path,
          value: err.value,
        })),
      });
    }
    next();
  },
];
