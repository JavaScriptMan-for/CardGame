import Card, { type SpecialCardType, type KeysCard } from "../Card.model";

export default class Jack extends Card implements SpecialCardType {
    public readonly value: number = 11;
    public readonly name: string = 'Jack';
    public static readonly count: number = 4;
    public static readonly type_: KeysCard = 'jack'
}