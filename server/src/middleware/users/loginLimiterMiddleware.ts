import rateLimit from "express-rate-limit";

export const loginLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    msg: "Too many login attempts from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip! ?? "unknown-ip",
});
