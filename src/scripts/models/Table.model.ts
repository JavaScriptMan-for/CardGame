import { CardType } from "./Card.model";

export default abstract class Table {
    public static cards: CardType[] = [];
    public static defend_cards: (CardType | undefined)[] = []
    public static values: number[] = []

    public static putCard(card: CardType) {
        if(this.cards.length < 6) {
            this.cards.push(card)
            this.values.push(card.value)
            this.defend_cards.push(undefined)
            this.cards = [...this.cards] // новая ссылка
            this.defend_cards = [...this.defend_cards]
        }
    }
}