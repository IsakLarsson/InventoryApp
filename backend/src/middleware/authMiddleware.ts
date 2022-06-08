import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";

export const protect = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET!
                ) as JwtPayload;

                req.user = await User.findById(decoded.id).select("-password");
                next();
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error("Not authorized");
            }
        }
        if (!token) {
            res.status(401);
            throw new Error("Not authorzied, no token");
        }
    }
);
