import { Money } from "./Money";

export default interface ItemInterface {
    name: string;
    value: Money;
    extraInformation?: string;
}
