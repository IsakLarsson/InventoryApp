import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/userInterface";

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    inventory: { type: Map, required: false },
    money: { type: Map, required: true },
});
