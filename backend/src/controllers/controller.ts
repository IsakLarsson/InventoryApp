import { RequestHandler } from "express";

export const hello: RequestHandler = (req, res): void => {
    res.json({ hello: "hello" });
};
