import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { checkToken } from "../../utils/token";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies["token"];

  if (!token)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  try {
    const { userId } = checkToken(token) as JwtPayload;
    req.userId = userId;

    next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token Expired", success: false });
    }

    return res.status(401).json({ msg: "Invalid token", success: false });
  }
};

export default verifyToken;
