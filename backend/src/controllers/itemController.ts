import express, { Request, Response } from "express";
import Item from "../models/itemModel";
import ItemInterface from "./../interfaces/ItemInterface";

export const createItem = async (req: Request, res: Response) => {
    const { itemName, value } = req.body;

    if (value == undefined) {
        res.status(500).json({ message: "Value field missing" });
        return;
    }

    const item = new Item<ItemInterface>({
        itemName: itemName,
        value: value,
    });

    try {
        const savedItem = await item.save();
        res.status(201).json({ createdItem: savedItem });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const results = await Item.find().exec();
        return res.status(200).json({
            items: results,
            count: results.length,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
};
