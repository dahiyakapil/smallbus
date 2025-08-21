import express from "express";
import { getProfile, login, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const authRouter = express.Router();


authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, getProfile);

export default authRouter;