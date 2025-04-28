import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../utils/token";
import { JwtPayload } from "jsonwebtoken";

export const verifyAccessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  const token = (auth as string)?.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  try {
    const { userId } = verifyAccessToken(token) as JwtPayload;
    req.userId = userId;

    next();
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token Expired", success: false });
    }

    return res
      .status(500)
      .json({
        msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
        success: false,
      });
  }
};
