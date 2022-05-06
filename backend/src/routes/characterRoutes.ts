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

const characterRoutes = express.Router();

characterRoutes.post("/api/characters/create", createCharacter);

characterRoutes.get("/api/characters/:id", getCharacterById);

characterRoutes.get("/api/characters/", getAllCharacters);

characterRoutes.patch(
    "/api/characters/:id/inventory/addItem",
    addItemToInventory
);

characterRoutes.patch("/api/characters/:id/coins", changeCoinsById);

characterRoutes.delete(
    "/api/characters/:id/inventory/deleteItem",
    deleteItemFromInventory
);

characterRoutes.delete("/api/characters/:id", deleteCharacterById);

export default characterRoutes;
