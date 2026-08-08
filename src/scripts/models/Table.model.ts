import { CardType } from "./Card.model";
import Deck from "./Deck.model";

export default abstract class Table {
    public static cards: CardType[] = [];
    public static defend_cards: (CardType | null)[] = []
    public static values: number[] = []

    public static onUpdate: (() => void) | null = null; //from react

    public static putCard(card: CardType) {
        if(this.cards.length < 6) {
            this.cards.push(card)
            this.values.push(card.value)
            this.defend_cards.push(null)
            if(this.onUpdate) this.onUpdate()
        }
    }
    public static clearTable() {
        if(this.cards.length < 1) return
        this.cards.splice(0, this.cards.length);
        this.defend_cards.splice(0, this.defend_cards.length);
        this.values.splice(0, this.values.length);
        if (this.onUpdate) this.onUpdate();
    }

    public static endGo() {
        const defend_exit_cards: CardType[] = []
        for(const card of Table.defend_cards) {
            if(card) defend_exit_cards.push(card)
        }
        Deck.dropCards(Table.cards)
        Deck.dropCards(defend_exit_cards)
    }
}