import mongoose, { Schema } from "mongoose";
import ItemInterface from "../interfaces/ItemInterface";
import { CharacterInterface } from "../interfaces/CharacterInterface";

const characterSchema = new Schema<CharacterInterface>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: { type: String, required: true },
        inventory: { type: [Object], required: true },
        coins: {
            gold: { type: Number, default: 0, required: true },
            silver: { type: Number, default: 0, required: true },
            copper: { type: Number, default: 0, required: true },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<CharacterInterface>("Character", characterSchema);
