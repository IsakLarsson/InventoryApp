import express from "express";
import { getAllItems, hello, createItem } from "../controllers/controller";

export const router = express.Router();

router.get("/api/hello", hello);

router.get("/api/items", getAllItems);

router.post("/api/items/create", createItem);
