import rateLimit from "express-rate-limit";

export const verifyEmailChangePwdLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 4,
  message: {
    success: false,
    msg: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip! ?? "unknown-ip",
});
