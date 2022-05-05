import express, { NextFunction, Request, Response } from "express";
import { CharacterInterface } from "../interfaces/CharacterInterface";
import ItemInterface from "../interfaces/ItemInterface";
import Character from "../models/characterModel";
import { Coins } from "../interfaces/coins";

export const createCharacter = async (req: Request, res: Response) => {
    const { name } = req.body;

    const newCharacter = new Character<CharacterInterface>({
        name: name,
        inventory: [],
        coins: { gold: 0, silver: 0, copper: 40 },
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
            return res.status(500).json({ message: error.message });
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
            return res.status(500).json({ message: error.message });
        }
    }
};

export const addItemToInventory = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const { itemName } = req.body;

    const newItem: ItemInterface = {
        name: itemName,
        value: { gold: 1337, silver: 0, copper: 0 },
    };

    try {
        const result = await Character.findById(characterId);
        result?.inventory.push(newItem);
        result?.save();
        res.status(200).json({ updatedCharacter: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const deleteItemFromInventory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const characterId = req.params.id;
    const { itemName } = req.body;

    if (!itemName) {
        return res.status(500).json({ errorMessage: "Invalid body" });
    }

    try {
        const result = await Character.findByIdAndUpdate(
            characterId,
            {
                $pull: { inventory: { name: itemName } },
            },
            {
                new: true,
            }
        );
        res.status(200).json({ updatedCharacter: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
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
            return res.status(500).json({ message: error.message });
        }
    }
};

export const addCoinsById = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const { gold, silver, copper } = req.body;

    if (!idIsValid(characterId)) {
        respondWithStatus(res, 500, "Invalid ID");
        return;
    }

    //Fix so that strings are invalid coin values. Also, an empty request replaces the whole coins object with an empty object
    const newCoins: Coins = {
        gold: gold,
        silver: silver,
        copper: copper,
    };

    try {
        const result = await Character.findById(characterId);
        if (result != undefined) {
            console.log(result.coins);
            result.coins = {
                gold: result.coins.gold + 1,
                silver: 0,
                copper: 0,
            };
            result.coins.gold = newCoins.gold;
            result.coins.silver += newCoins.silver;
            result.coins.copper += newCoins.copper;
            result.save();
            res.status(200).json({ updatedCharacter: result });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
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
