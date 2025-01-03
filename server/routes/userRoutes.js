import express from "express";

import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import User from "../models/userModel.js";
import { userData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuthMiddleware, userData);

export default userRouter;

