import express, { Request, Response } from "express";
import asyncWrapper from "../middleware/general/asyncWrapper";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  // validateToken,
} from "../controllers/usersController";
import {
  validateLogin,
  validatorRegister,
} from "../middleware/users/validatorMiddleware";
import { loginLimiterMiddleware } from "../middleware/users/loginLimiterMiddleware";
// import verifyToken from "../middleware/general/verifyToken";
import { changePwd } from "../controllers/changePwdControllers";
import { verifyAccessTokenMiddleware } from "../middleware/general/validateAccessToken";
const router = express.Router();

router.get("/refresh-token", asyncWrapper(refreshToken));

router.post("/register", validatorRegister, asyncWrapper(registerUser));

router.post(
  "/login",
  loginLimiterMiddleware,
  validateLogin,
  asyncWrapper(loginUser)
);

router.put("/change-pwd", asyncWrapper(changePwd));

router.post("/logout", asyncWrapper(logoutUser));

router.get("/info", verifyAccessTokenMiddleware, asyncWrapper(getUserInfo));

// router.get("/validate-token", verifyToken, asyncWrapper(validateToken));

export default router;
