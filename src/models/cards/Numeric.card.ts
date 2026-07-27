import Card, { type SpecialCardType, Suits } from "../Card.model";

export default class Numeric extends Card implements SpecialCardType {
    public readonly name: string;
    public static readonly count: number = 4;
    public static readonly type_: null = null
    
    #value: number;
    get value() {
        if(this.#value > 10) this.#value = 10
        if(this.#value < 2) this.#value = 2
        return this.#value
    }

    constructor(suit: Suits, player_id: number | null, value: number) {
        super(suit, player_id)
        this.#value = value
        this.name = value.toString()
    }
}