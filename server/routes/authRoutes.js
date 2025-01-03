import express from "express";
import {loginUser, logoutUser, registerUser, sendVerifyOTP, verifyEmail} from "../controllers/authController.js"
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/send-otp", userAuthMiddleware, sendVerifyOTP);
authRouter.post("/verify-otp", userAuthMiddleware, verifyEmail);

export default authRouter