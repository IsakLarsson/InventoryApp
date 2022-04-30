import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getAllItems, hello, createItem } from "../controllers/controller";

export const router = express.Router();

router.get("/api/hello", hello);

router.get("/api/items", getAllItems);

router.post("/api/items/create", createItem);
