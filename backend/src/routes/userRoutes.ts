import express from "express";

import { loginUser, registerUser } from "../controllers/userController";
import { getMe } from "./../controllers/userController";

const authRoutes = express.Router();

authRoutes.post("/api/user/", registerUser);
authRoutes.post("/api/user/login", loginUser);
authRoutes.get("/api/user/", getMe);

export default authRoutes;
