import { check, validationResult } from "express-validator";
import { REG_NAME, REG_PWD } from "../../constants/regex";
import { Request, Response } from "express";
import { NextFunction } from "express";

export const validatorRegister = [
  check("firstName")
    .matches(REG_NAME)
    .withMessage("First name must be between 3 and 50 characters"),
  check("lastName")
    .matches(REG_NAME)
    .withMessage("Last name must be between 3 and 50 characters"),

  check("email").isEmail().withMessage("Invalid email format"),

  check("password")
    .matches(REG_PWD)
    .withMessage(
      "Password must must be at least 8 chars and  contain at least one uppercase letter, one lowercase letter, one number, and one special char"
    ),

  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    next();
  },
];

export const validateLogin = [
  check("email").isEmail().withMessage("Invalid email format"),

  check("password")
    .matches(REG_PWD)
    .withMessage(
      "Password must be at least 8 chars and contain at least one uppercase letter, one lowercase letter, one number, and one special char"
    ),

  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    next();
  },
];
