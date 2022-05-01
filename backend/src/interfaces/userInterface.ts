export interface UserInterface {
    name: string;
    inventory: object[];
    money: { gold?: number; silver?: number; copper?: number };
}
