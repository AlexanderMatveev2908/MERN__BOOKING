import rateLimit from "express-rate-limit";

export const rateLimiterBooking = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    msg: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip! ?? "unknown-ip",
});
