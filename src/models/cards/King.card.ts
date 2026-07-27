import Card, { type SpecialCardType, type KeysCard } from "../Card.model";

export default class King extends Card implements SpecialCardType {
    public readonly value: number = 13;
    public readonly name: string = 'King';
    public static readonly count: number = 4;
    public static readonly type_: KeysCard = 'king'
}