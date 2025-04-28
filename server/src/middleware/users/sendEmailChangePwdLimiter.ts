import rateLimit from "express-rate-limit";

export const sendEmailChangePwdLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: {
    success: false,
    msg: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip! ?? "unknown-ip",
});
