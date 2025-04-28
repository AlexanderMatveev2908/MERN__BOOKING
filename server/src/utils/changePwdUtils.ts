import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const checkTokenChangePwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, userId } = req.query;

  if (!token || !userId)
    return res
      .status(400)
      .json({ msg: "Token and user ID are required", success: false });

  const user = await User.findById(userId);
  if (!user)
    return res.status(401).json({ msg: "User not found", success: false });

  if (![user.changePwdToken, user.expiryChangePwdToken].every((el) => !!el))
    return res
      .status(401)
      .json({ msg: "Invalid or expired token.", success: false });

  if (user.expiryChangePwdToken < Date.now())
    return res.status(401).json({ msg: "Token has expired.", success: false });

  const match = await bcrypt.compare(token as string, user.changePwdToken);
  if (!match)
    return res.status(401).json({ msg: "Invalid token", success: false });

  return { user };
};
