import { type CardType } from "./Card.model"
import Deck from "./Deck.model"


export default class Arm {
    private static nextId: number = 1;
    public player_id: number;
    public readonly quantity: number;
    public readonly cards: CardType[] = []

    public takeCards() {
        for(let i = this.cards.length; i < this.quantity; i++) {
            if(Deck.cards.length < 1) break;
            this.cards.push(Deck.cards[Deck.cards.length - 1])
            Deck.takeCard();
        }
        for(const card of this.cards) {
            card.player_id = this.player_id
        }
    }

    constructor(quantity?: number) {
        this.player_id = Arm.nextId++;
        this.quantity = quantity ? quantity : 6
    }
}