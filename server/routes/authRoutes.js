import express from "express";
import {isAuthenticated, loginUser, logoutUser, registerUser, resetPassword, sendPasswordResetOTP, sendVerifyOTP, verifyEmail} from "../controllers/authController.js"
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-otp", userAuthMiddleware, sendVerifyOTP);
authRouter.post("/verify-otp", userAuthMiddleware, verifyEmail);
authRouter.post("/is-auth", userAuthMiddleware, isAuthenticated);
authRouter.post("/password-reset-otp", sendPasswordResetOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter