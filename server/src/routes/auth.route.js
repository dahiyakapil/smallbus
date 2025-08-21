import express from "express";
import { deleteUser, getProfile, login, signup, updateUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const authRouter = express.Router();


authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/profile", authMiddleware, getProfile);
authRouter.put("/profile", authMiddleware, updateUser);
authRouter.delete("/profile", authMiddleware, deleteUser);

export default authRouter;