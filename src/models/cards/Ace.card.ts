import Card, { type SpecialCardType, type KeysCard } from "../Card.model";

export default class Ace extends Card implements SpecialCardType {
    public readonly value: number = 14
    public readonly name: string = 'Ace'
    public static readonly count: number = 4;
    public static readonly type_: KeysCard = 'ace'
}