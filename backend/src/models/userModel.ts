import mongoose, { Schema } from "mongoose";
import ItemInterface from "./../interfaces/ItemInterface";
import { UserInterface } from "./../interfaces/userInterface";

const userSchema = new Schema<UserInterface>(
    {
        userName: { type: String, required: true },
        inventory: { type: [Object], required: true },
        money: { type: Map, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<UserInterface>("User", userSchema);
