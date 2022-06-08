import ItemInterface from "./ItemInterface";
import { Coins } from "./coins";

export interface CharacterInterface {
    user: string;
    name: string;
    inventory: ItemInterface[];
    coins: Coins;
}
