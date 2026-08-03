import Card, { type SpecialCardType, type KeysCard, Suits, Colors } from "../Card.model";

export default class Joker extends Card implements SpecialCardType {
    public readonly value: number = 15;
    public readonly name: string = 'Joker';
    public static readonly count: number = 2;
    public static readonly type_: KeysCard = 'joker'
    private static nextId: number = 0;

    constructor(suit: Suits, player_id: number | null) {
        super(suit, player_id) 
        Joker.nextId++ 
        this.suit = null
        this.color = Joker.nextId === 1 ? Colors.BLACK : Colors.RED
    }
}