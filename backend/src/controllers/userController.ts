import express, { Request, Response } from "express";
import { UserInterface } from "../interfaces/userInterface";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    const { userName } = req.body;

    const newUser = new User<UserInterface>({
        userName: userName,
        inventory: [],
        money: { gold: 0 },
    });

    try {
        const result = await newUser.save();
        return res.status(201).json({ newUser: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await User.findById(userId);
        return res.status(200).json({ user: result });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    }
};
