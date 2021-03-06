import express from "express";
import {
    changeCoinsById,
    addItemToInventory,
    createCharacter,
    deleteCharacterById,
    deleteItemFromInventory,
    getAllCharacters,
    getCharacterById,
} from "../controllers/characterController";
import { protect } from "../middleware/authMiddleware";

const characterRoutes = express.Router();

characterRoutes.post("/api/characters/", protect, createCharacter);

characterRoutes.get("/api/characters/:id", protect, getCharacterById);

characterRoutes.get("/api/characters/", protect, getAllCharacters);

characterRoutes.post(
    "/api/characters/:id/inventory/",
    protect,
    addItemToInventory
);

characterRoutes.patch("/api/characters/:id/coins", protect, changeCoinsById);

characterRoutes.delete(
    "/api/characters/:id/inventory/:itemid",
    protect,
    deleteItemFromInventory
);

characterRoutes.delete("/api/characters/:id", protect, deleteCharacterById);

export default characterRoutes;
