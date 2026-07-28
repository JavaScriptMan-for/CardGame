import Card, { type SpecialCardType, type KeysCard } from "../Card.model";

export default class Lady extends Card implements SpecialCardType {
    public readonly value: number = 12;
    public readonly name: string = "Lady";
    public static readonly count: number = 4;
    public static readonly type_: KeysCard = 'lady'
}