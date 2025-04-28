import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

export const genToken = (userId: string): string =>
  jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    // expiresIn: "10s",
    expiresIn: process.env.NODE_ENV === "production" ? "1d" : "1h",
  });

export const checkToken = (token: string): string | JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET as string);

export const genAccessToken = (userId: string): string =>
  // jwt.sign({ userId }, process.env.JWT_ACCESS as string, { expiresIn: "5s" });
  jwt.sign({ userId }, process.env.JWT_ACCESS as string, { expiresIn: "15m" });

export const verifyAccessToken = (token: string): string | JwtPayload =>
  jwt.verify(token, process.env.JWT_ACCESS as string);

export const sendCookie = (
  res: Response,
  token: string,
  options: any = {}
): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // maxAge: 1000 * 10,
    maxAge:
      process.env.NODE_ENV === "production"
        ? 1000 * 60 * 60 * 24
        : 1000 * 60 * 60,
  });
};

export const generateMailToken = async (): Promise<any> => {
  const token = randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expiryVerificationToken = Date.now() + 1000 * 60 * 15;
  return { token, hashedToken, expiryVerificationToken };
};
