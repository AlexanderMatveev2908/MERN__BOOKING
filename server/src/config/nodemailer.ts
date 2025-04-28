import nodemailer from "nodemailer";

const optProduction = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: {
    rejectUnauthorized: true,
  },
};

const optDev = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
};

export const transporter = nodemailer.createTransport({
  ...(process.env.NODE_ENV === "production" ? optProduction : optDev),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
