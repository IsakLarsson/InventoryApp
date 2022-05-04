import mongoose, { Schema } from "mongoose";
import ItemInterface from "../interfaces/ItemInterface";
import { CharacterInterface } from "../interfaces/CharacterInterface";

const characterSchema = new Schema<CharacterInterface>(
    {
        name: { type: String, required: true },
        inventory: { type: [Object], required: true },
        coins: { type: Map, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<CharacterInterface>("Character", characterSchema);
