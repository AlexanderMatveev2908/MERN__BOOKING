import express from "express";
import asyncWrapper from "../middleware/general/asyncWrapper";
import { verifyEmailLimiter } from "../middleware/users/verifyEmailRateLimiter";
import { sendEmailAgain, verifyEmail } from "../controllers/verifyControllers";
import { verifyEmailChangePwdLimiter } from "../middleware/users/verifyEmailChangePwdLimiter";
import {
  sendEmailChangePwd,
  verifyEmailChangePwd,
} from "../controllers/changePwdControllers";
import { sendEmailVerifyLimiter } from "../middleware/users/sendEmailVerifyLimiter";
import { sendEmailChangePwdLimiter } from "../middleware/users/sendEmailChangePwdLimiter";

const router = express.Router();

router.get("/verify-email", verifyEmailLimiter, asyncWrapper(verifyEmail));
router.post(
  "/send-email-again",
  sendEmailVerifyLimiter,
  asyncWrapper(sendEmailAgain)
);

router.post(
  "/send-email-change-pwd",
  sendEmailChangePwdLimiter,
  asyncWrapper(sendEmailChangePwd)
);
router.get(
  "/verify-email-change-pwd",
  sendEmailChangePwdLimiter,
  asyncWrapper(verifyEmailChangePwd)
);

export default router;
