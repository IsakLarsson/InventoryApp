import express from "express";
import { createUser, getUserById } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/api/users/create", createUser);

userRouter.get("/api/users/getById/:id", getUserById);
