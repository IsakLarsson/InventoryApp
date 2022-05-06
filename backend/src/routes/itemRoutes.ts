import express from "express";
import { getAllItems, createItem } from "./../controllers/itemController";

const itemRoutes = express.Router();

itemRoutes.get("/api/items/", getAllItems);

itemRoutes.post("/api/items/create/", createItem);

export default itemRoutes;
