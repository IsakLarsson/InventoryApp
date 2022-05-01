import express, { Request, Response } from "express";

interface ResponseError extends Error {
    status?: number;
    message: string;
}

export const errorHandling = (
    err: ResponseError,
    req: Request,
    res: Response
) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    console.error(process.env.NODE_ENV == "development" ? err.stack : "");
    res.status(statusCode).json({
        message: err.message
            ? err.message
            : "Oops, seems I've encountered an error!",
    });
};
