import ItemInterface from "./ItemInterface";
import { Money } from "./Money";

export interface UserInterface {
    userName: string;
    inventory: ItemInterface[];
    money: Money;
}
