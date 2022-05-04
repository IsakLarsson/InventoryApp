import express from "express";
import {
    addItemToInventory,
    createCharacter,
    deleteCharacterById,
    getAllCharacters,
    getCharacterById,
} from "../controllers/characterController";

const characterRoutes = express.Router();

characterRoutes.post("/api/characters/create", createCharacter);

characterRoutes.get("/api/characters/getById/:id", getCharacterById);

characterRoutes.get("/api/characters/", getAllCharacters);

characterRoutes.patch("/api/characters/:id/addItem", addItemToInventory);

characterRoutes.delete("/api/characters/deleteById/:id", deleteCharacterById);

export default characterRoutes;
