import mongoose, { Schema } from "mongoose";
import User from "../interfaces/UserInterface";

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
