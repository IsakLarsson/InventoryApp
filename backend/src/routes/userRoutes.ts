import express from "express";

import { loginUser, registerUser } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { getMe } from "./../controllers/userController";

const authRoutes = express.Router();

authRoutes.post("/api/user/", registerUser);
authRoutes.post("/api/user/login", loginUser);
authRoutes.get("/api/user/", protect, getMe);

export default authRoutes;
