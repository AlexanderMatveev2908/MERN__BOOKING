import { Request, Response } from "express";
import User from "../models/User";
import {
  genAccessToken,
  generateMailToken,
  genToken,
  sendCookie,
} from "../utils/token";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/sendEmail";
import { REG_EMAIL } from "../constants/regex";

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, userId } = req.query;

  if (!token || !userId)
    return res
      .status(400)
      .json({ msg: "Token && email are required", success: false });

  try {
    const user = await User.findById(userId);

    if (!user)
      return res.status(401).json({ msg: "User not found", success: false });
    if (
      ![user.verificationToken, user.expiryVerificationToken].every(
        (el) => !!el
      )
    )
      return res
        .status(401)
        .json({ msg: "Invalid or expired token.", success: false });
    if (user.expiryVerificationToken < Date.now()) {
      await User.findByIdAndUpdate(userId, {
        verificationToken: null,
        expiryVerificationToken: null,
      });
      return res
        .status(401)
        .json({ msg: "Token has expired.", success: false });
    }

    const match = await bcrypt.compare(token as string, user.verificationToken);
    if (!match)
      return res.status(401).json({ msg: "=> Invalid token", success: false });

    user.isVerified = true;
    user.verificationToken = null;
    user.expiryVerificationToken = null;

    await user.save();

    const accessToken = genAccessToken(user._id);

    sendCookie(res, genToken(user._id));

    return res
      .status(200)
      .json({ success: true, accessToken, msg: "Email verified successfully" });
  } catch (err: any) {
    return res.status(401).json({ msg: "Invalid token", success: false });
  }
};

export const sendEmailAgain = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ msg: "Email is required", success: false });

  if (!REG_EMAIL.test(email))
    return res
      .status(400)
      .json({ msg: "Invalid email format", success: false });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ msg: "User not found", success: false });
  if (user.isVerified)
    return res
      .status(400)
      .json({ msg: "User is already verified", success: false });

  const { token, hashedToken, expiryVerificationToken } =
    await generateMailToken();

  user.verificationToken = hashedToken;
  user.expiryVerificationToken = expiryVerificationToken;
  await user.save();
  await sendVerificationEmail("verify-email", user, token);

  return res.status(200).json({ success: true, msg: "Email sent again" });
};
