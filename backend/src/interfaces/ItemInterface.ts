import { Document } from "mongoose";

export default interface ItemInterface extends Document {
    name: string;
    value: number;
    extraInformation: string;
}
