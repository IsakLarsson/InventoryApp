import express, { Request, Response } from "express";
import { stat } from "fs";
import { CharacterInterface } from "../interfaces/CharacterInterface";
import ItemInterface from "../interfaces/ItemInterface";
import Character from "../models/characterModel";

export const createCharacter = async (req: Request, res: Response) => {
    const { name } = req.body;

    const newCharacter = new Character<CharacterInterface>({
        name: name,
        inventory: [],
        coins: { gold: 0 },
    });

    try {
        const result = await newCharacter.save();
        return res.status(201).json({ created_character: result });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500);
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};

export const getAllCharacters = async (req: Request, res: Response) => {
    try {
        const result = await Character.find();
        return res.status(200).json({ character: result });
    } catch (error) {
        if (error instanceof Error) {
            respondWithStatus(res, 500, error.message);
            return;
        }
    }
};

export const getCharacterById = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    if (!idIsValid(characterId)) {
        respondWithStatus(res, 500, "Invalid ID");
        return;
    }

    try {
        const result = await Character.findById(characterId);
        return res.status(200).json({ character: result });
    } catch (error) {
        if (error instanceof Error) {
            respondWithStatus(res, 500, error.message);
            return;
        }
    }
};

export const addItemToInventory = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const { itemName } = req.body;
    console.log(itemName);

    const newItem: ItemInterface = {
        name: itemName,
        value: { gold: 1337 },
    };

    try {
        const result = await Character.findByIdAndUpdate(
            characterId,
            {
                $push: { inventory: newItem },
            },
            { lean: true, new: true }
        );
        res.status(200).json({ updatedCharacter: result });
    } catch (error) {
        if (error instanceof Error) {
            respondWithStatus(res, 500, error.message);
            return;
        }
    }
};

export const deleteCharacterById = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    if (!idIsValid(characterId)) {
        respondWithStatus(res, 500, "Invalid ID");
        return;
    }

    try {
        const result = await Character.findByIdAndDelete(characterId);
        return res.status(200).json({ character: result });
    } catch (error) {
        if (error instanceof Error) {
            respondWithStatus(res, 500, error.message);
            return;
        }
    }
};

const idIsValid = (id: string) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }
};

const respondWithStatus = (
    res: Response,
    statusCode: number,
    message: string
) => {
    return res.status(statusCode).json({ message: message });
};
