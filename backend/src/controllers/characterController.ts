import express, { NextFunction, Request, Response } from "express";
import { CharacterInterface } from "../interfaces/CharacterInterface";
import ItemInterface from "../interfaces/ItemInterface";
import Character from "../models/characterModel";
import { Coins } from "../interfaces/coins";
import Item from "../models/itemModel";
import asyncHandler from "express-async-handler";

export const createCharacter = asyncHandler(async (req: any, res: Response) => {
    const { name } = req.body;
    const newCharacter = new Character<CharacterInterface>({
        name: name,
        inventory: [],
        coins: { gold: 0, silver: 0, copper: 40 },
        user: req.user.id,
    });

    try {
        const savedCharacter = await newCharacter.save();
        res.status(201).json({ created_character: savedCharacter });
        return;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});

export const getAllCharacters = asyncHandler(
    async (req: any, res: Response) => {
        try {
            const foundCharacters = await Character.find({
                user: req.user.id,
            }).exec();
            res.status(200).json({ characters: foundCharacters });
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

export const getCharacterById = asyncHandler(
    async (req: Request, res: Response) => {
        const characterId = req.params.id;
        if (!idIsValid(characterId)) {
            throw new Error("Ivalid ID");
        }

        try {
            const foundCharacter = await Character.findById(characterId).exec();
            res.status(200).json({ character: foundCharacter });
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

export const addItemToInventory = asyncHandler(
    async (req: Request, res: Response) => {
        const characterId = req.params.id;
        const { itemName, value, description } = req.body;

        if (!itemName || !value) {
            throw new Error("Missing required fields");
        }

        const newItem = new Item<ItemInterface>({
            itemName: itemName,
            value: value,
            description: description,
        });

        try {
            const foundCharacter = await Character.findById(characterId).exec();

            if (foundCharacter != undefined) {
                foundCharacter.inventory.push(newItem);
                await foundCharacter.save();
                res.status(200).json({ addedItem: newItem });
                return;
            } else {
                res.status(404).json({
                    message: "Couldn't find that character!",
                });
                return;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

export const deleteItemFromInventory = asyncHandler(
    async (req: Request, res: Response) => {
        const characterId = req.params.id;
        const { itemName } = req.body;

        if (!itemName) {
            res.status(500).json({ errorMessage: "Invalid body" });
            return;
        }

        try {
            //Fix so that error occurs if notthing is found, also change to delete by ID instead of name
            const foundCharacter = await Character.findByIdAndUpdate(
                characterId,
                {
                    $pull: { inventory: { itemName: itemName } },
                },
                {
                    new: true,
                }
            );
            res.status(200).json({ updatedCharacter: foundCharacter });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

export const deleteCharacterById = asyncHandler(
    async (req: Request, res: Response) => {
        const characterId = req.params.id;
        if (!idIsValid(characterId)) {
            throw new Error("Invalid ID");
        }

        try {
            const deletedCharacter = await Character.findByIdAndDelete(
                characterId
            ).exec();

            if (!deletedCharacter) {
                res.status(404);
                throw new Error("Character not found");
            }

            res.status(200).json({ deletedCharacter: deletedCharacter });
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

export const changeCoinsById = asyncHandler(
    async (req: Request, res: Response) => {
        const characterId = req.params.id;
        const newCoins: Coins = req.body;

        if (!idIsValid(characterId)) {
            throw new Error("Invalid ID");
        }

        //Fix so that strings are invalid coin values

        try {
            const foundCharacter = await Character.findById(characterId).exec();
            if (foundCharacter != undefined) {
                const currentCoins = foundCharacter.coins;
                foundCharacter.coins = sumCoins(currentCoins, newCoins);
                await foundCharacter.save();
                res.status(200).json({ updatedCharacter: foundCharacter });
            } else {
                res.status(404).json({
                    message: "Couldn't find that character!",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
);

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
