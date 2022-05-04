import ItemInterface from "./ItemInterface";
import { Coins } from "./coins";

export interface CharacterInterface {
    name: string;
    inventory: ItemInterface[];
    coins: Coins;
}
