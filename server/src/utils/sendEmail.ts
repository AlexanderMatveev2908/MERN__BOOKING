import { transporter } from "../config/nodemailer";
import { UserType } from "../models/User";

// export const sendMailTest = async (
//   to: string,
//   subject: string,
//   text: string
// ) => {
//   const mailOpt = {
//     from: process.env.MAIL_USER,
//     to,
//     subject,
//     text,
//   };

//   try {
//     const info = await transporter.sendMail(mailOpt);
//     console.log("Message sent: ✌🏼", info.response);
//   } catch (err) {
//     console.dir(err);
//   }
// };

export const sendVerificationEmail = async (
  path: string,
  user: UserType,
  token: string
) => {
  const basePath =
    process.env.NODE_ENV === "production"
      ? "https://mern-booking-app-0w8v.onrender.com/user"
      : "http://localhost:3001/user";
  const verificationTokenUrl = `${basePath}/${path}?token=${token}&userId=${user._id}`;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "Verify your email",
    text: `Click the link below to verify your email ✌🏼: ${verificationTokenUrl}`,
  });
};

export const sendEmailAfterBooking = async ({
  to,
  status,
}: {
  [key: string]: string;
}) => {
  let sub = "";
  let txt = "";

  if (!to || !status) return;

  if (status === "paid") {
    sub = "BOOKING CONFIRMED";
    txt = `Your booking has been confirmed! 🎉\nEnjoy your stay and thanks for choosing us ✌🏼`;
  } else if (status === "failed") {
    sub = "PAYMENT FAILED";
    txt = `Your payment has failed ⛔\nProceed to complete checkout as soon as possible to not lose your stay 😉
    `;
  } else if (status === "deleted") {
    sub = "BOOKING DELETED";
    txt = `Your booking has been deleted successfully✅\nDon't worry you can rebook whenever you want ✌🏼`;
  }

  const mailOpt = {
    from: process.env.MAIL_USER,
    to,
    subject: sub,
    text: txt,
  };

  try {
    await transporter.sendMail(mailOpt);
  } catch (err: any) {}
};
