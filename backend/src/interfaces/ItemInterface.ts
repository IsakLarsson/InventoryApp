import { Coins } from "./coins";

export default interface ItemInterface {
    itemName: string;
    value: Coins;
    description?: string;
    _id?: string;
}
