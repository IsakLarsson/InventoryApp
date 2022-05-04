import { Coins } from "./coins";

export default interface ItemInterface {
    name: string;
    value: Coins;
    extraInformation?: string;
}
