export enum Suits {
    PEAK='peak',
    CROSS='cross',
    BUBA='buba',
    WORMS='worms'
}
export enum Colors {
    BLACK='black',
    RED='red'
}

export interface SpecialCardType {
    value: number,
    name: string,
}
export type KeysCard = 'jack' | 'lady' | 'king' | 'ace' | 'joker'

export type CardType = Card & SpecialCardType

export default class Card {
    public suit: Suits | null;
    public readonly color: Colors;

    public player_id: number | null = null;

    constructor(suit: Suits, player_id: number | null) {
        this.suit = suit
        this.color = this.suit === Suits.PEAK || this.suit === Suits.CROSS ? Colors.BLACK : Colors.RED
        this.player_id = player_id
    }
}