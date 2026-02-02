import express from "express";
import { loginUser, registerUser, loginAdmin, updateProfile, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/login-admin", loginAdmin);
userRouter.put("/update", authMiddleware, updateProfile);
userRouter.post("/get", authMiddleware, getProfile);

export default userRouter;