import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = (req: Request, res: Response) => {
    const user = {
        id: 1,
        username: "test",
        email: "test@test.com",
    };
    jwt.sign({ user }, "secretkey", (err: any, token: any) => {
        res.json({
            token,
        });
    });
};
export const loginUser = (req: Request, res: Response) => {
    res.json({ message: "login user" });
};
export const getMe = (req: Request, res: Response) => {
    res.json({ message: "get user" });
};
