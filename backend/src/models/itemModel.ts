import mongoose, { Schema } from "mongoose";
import ItemInterface from "../interfaces/ItemInterface";

const itemScehma: Schema = new Schema(
    {
        name: { type: String, required: true },
        value: { type: Number, required: true },
        extraInformation: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ItemInterface>("Item", itemScehma);
