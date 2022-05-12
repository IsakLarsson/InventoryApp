import mongoose, { Schema } from "mongoose";
import ItemInterface from "../interfaces/ItemInterface";

const itemScehma = new Schema<ItemInterface>(
    {
        itemName: { type: String, required: true },
        value: {
            gold: { type: Number, default: 0, required: true },
            silver: { type: Number, default: 0, required: true },
            copper: { type: Number, default: 0, required: true },
        },
        description: {
            type: String,
            default: "No description available",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ItemInterface>("Item", itemScehma);
