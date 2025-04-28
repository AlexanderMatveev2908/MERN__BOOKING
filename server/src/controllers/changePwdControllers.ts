import { Request, Response } from "express";
import { REG_EMAIL, REG_PWD } from "../constants/regex";
import User from "../models/User";
import {
  genAccessToken,
  generateMailToken,
  genToken,
  sendCookie,
} from "../utils/token";
import { sendVerificationEmail } from "../utils/sendEmail";
import bcrypt from "bcryptjs";
import { checkTokenChangePwd } from "../utils/changePwdUtils";

export const sendEmailChangePwd = async (
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
    return res.status(401).json({ msg: "User not found", success: false });

  if (!user.isVerified)
    return res
      .status(401)
      .json({ msg: "User is not verified", success: false });

  const { token, hashedToken, expiryVerificationToken } =
    await generateMailToken();

  user.changePwdToken = hashedToken;
  user.expiryChangePwdToken = expiryVerificationToken;
  await user.save();

  sendVerificationEmail("verify-email-change-pwd", user, token);

  return res.status(201).json({
    success: true,
    msg: "Password change email sent!",
  });
};

export const verifyEmailChangePwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  await checkTokenChangePwd(req, res);

  return res
    .status(200)
    .json({ success: true, msg: "user verified successfully" });
};

export const changePwd = async (req: Request, res: Response): Promise<any> => {
  const { newPassword } = req.body;

  const { user } = await checkTokenChangePwd(req, res);

  if (!REG_PWD.test(newPassword))
    return res
      .status(400)
      .json({ msg: "Invalid password format", success: false });

  const isSamePwd = await bcrypt.compare(newPassword, user.password);
  if (isSamePwd)
    return res.status(400).json({
      msg: "New password cannot be the same as the old one",
      success: false,
    });

  user.password = newPassword;
  user.changePwdToken = null;
  user.expiryChangePwdToken = null;
  await user.save();

  const accessToken = genAccessToken(user._id);

  sendCookie(res, genToken(user._id));

  return res
    .status(200)
    .json({ success: true, accessToken, msg: "Password changed successfully" });
};
