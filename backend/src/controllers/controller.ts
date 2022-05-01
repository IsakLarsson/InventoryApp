import { NextFunction, Request, RequestHandler, Response } from "express";
import Item from "../models/itemModel";
import mongoose from "mongoose";

export const createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, value } = req.body;
    const item = new Item({
        name: name,
        value: value,
    });

    try {
        const result = await item.save();
        return res.status(201).json({ item: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const results = await Item.find().exec();
        return res.status(200).json({
            items: results,
            count: results.length,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const hello: RequestHandler = (req: Request, res: Response): void => {
    res.json({ hello: "hello" });
};
