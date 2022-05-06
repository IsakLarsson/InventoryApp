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
        const savedCharacter = await newCharacter.save();
        return res.status(201).json({ created_character: savedCharacter });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500);
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};

export const getAllCharacters = async (req: Request, res: Response) => {
    try {
        const foundCharacters = await Character.find();
        return res.status(200).json({ characters: foundCharacters });
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
        const foundCharacter = await Character.findById(characterId);
        return res.status(200).json({ character: foundCharacter });
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
        const foundCharacter = await Character.findById(characterId);

        if (foundCharacter != undefined) {
            foundCharacter.inventory.push(newItem);
            await foundCharacter.save();
            return res.status(200).json({ updatedCharacter: foundCharacter });
        } else {
            return res
                .status(404)
                .json({ message: "Couldn't find that character!" });
        }
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
        const foundCharacter = await Character.findByIdAndUpdate(
            characterId,
            {
                $pull: { inventory: { name: itemName } },
            },
            {
                new: true,
            }
        );
        res.status(200).json({ updatedCharacter: foundCharacter });
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
        const deletedCharacter = await Character.findByIdAndDelete(characterId);
        return res.status(200).json({ deletedCharacter: deletedCharacter });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const changeCoinsById = async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const newCoins: Coins = req.body;

    if (!idIsValid(characterId)) {
        respondWithStatus(res, 500, "Invalid ID");
        return;
    }

    //Fix so that strings are invalid coin values

    try {
        const foundCharacter = await Character.findById(characterId);
        if (foundCharacter != undefined) {
            const currentCoins = foundCharacter.coins;
            foundCharacter.coins = sumCoins(currentCoins, newCoins);
            await foundCharacter.save();
            res.status(200).json({ updatedCharacter: foundCharacter });
        } else {
            return res
                .status(404)
                .json({ message: "Couldn't find that character!" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

const sumCoins = (currentCoins: Coins, newCoins: Coins): Coins => {
    const totalCoins: Coins = {
        gold: currentCoins.gold + newCoins.gold,
        silver: currentCoins.silver + newCoins.silver,
        copper: currentCoins.copper + newCoins.copper,
    };
    return totalCoins;
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
