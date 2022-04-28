import express from "express";
import { hello } from "../controllers/controller";

export const router = express.Router();

router.get("/api/hello", hello);
