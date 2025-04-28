import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import {
  checkToken,
  genAccessToken,
  generateMailToken,
  genToken,
  sendCookie,
} from "../utils/token";
import { sendVerificationEmail } from "../utils/sendEmail";
import { JwtPayload } from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = req.body;
  const existingUser = await User.findOne({ email: newUser.email });

  if (existingUser)
    return res.status(400).json({ msg: "User already exists", success: false });

  const { token, hashedToken, expiryVerificationToken } =
    await generateMailToken();
  newUser.verificationToken = hashedToken;
  newUser.expiryVerificationToken = expiryVerificationToken;

  const user = await User.create(newUser);
  await sendVerificationEmail("verify-email", user, token);

  return res.status(201).json({
    success: true,
    msg: "User registered! verify your email.",
  });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ msg: "User with this email does not exist", success: false });

  if (!user.isVerified)
    return res
      .status(401)
      .json({ msg: "User is not verified", success: false });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ msg: "Invalid password", success: false });

  sendCookie(res, genToken(user._id));

  const accessToken = genAccessToken(user._id);

  return res.status(200).json({
    success: true,
    accessToken,
    userId: user._id,
    msg: "login performed successfully",
  });
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  res.cookie("token", "", { expires: new Date(0) });

  return res
    .status(200)
    .json({ success: true, msg: "logout performed successfully" });
};

// export const validateToken = (req: Request, res: Response): any => {
//   const { userId } = req;

//   return res.status(200).json({ success: true, userId });
// };

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.cookies["token"];

  if (!token)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  try {
    const { userId } = checkToken(token) as JwtPayload;

    const accessToken = genAccessToken(userId);

    return res.status(200).json({ success: true, accessToken });
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token Expired", success: false });
    }

    return res.status(500).json({
      msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
      success: false,
    });
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const user = await User.findById(userId).select("email firstName lastName");
  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  return res.status(200).json({ success: true, user });
};
