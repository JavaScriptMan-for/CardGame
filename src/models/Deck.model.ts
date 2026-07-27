import { Suits, type KeysCard, type CardType } from "./Card.model";
import Numeric from "./cards/Numeric.card";
import Jack from "./cards/Jack.card";
import Lady from "./cards/Lady.card";
import King from "./cards/King.card";
import Ace from "./cards/Ace.card";
import Joker from "./cards/Joker.card";

type DeckType =
  | typeof Jack
  | typeof Lady
  | typeof King
  | typeof Ace
  | typeof Joker;

export default abstract class Deck {
  public static cards: CardType[] = [];

  private static readonly suits: Suits[] = [
    Suits.PEAK,
    Suits.CROSS,
    Suits.WORMS,
    Suits.BUBA,
  ];

  private static types: Record<KeysCard, DeckType> = {
    jack: Jack,
    lady: Lady,
    king: King,
    ace: Ace,
    joker: Joker,
  };

  public static trump_card: Suits | null = null

  public static createDeck(count: number = 1) {
    //Особые карты
    for (let initI = 0; initI < count; initI++) {
      for (const key in this.types) {
        const card_type = this.types[key as KeysCard];
        for (let i = 0; i < card_type.count; i++) {
          this.cards.push(new card_type(this.suits[i], null));
        }
      }
    }
    //Цифровые карты
    for (let i = 2; i <= 10; i++) {
      for (let j = 0; j < Numeric.count; j++) {
        this.cards.push(new Numeric(this.suits[j], null, i));
      }
    }
    this.trump_card = this.cards[0].suit ? this.cards[0].suit : Suits.WORMS
  }
  public static mix() {
    const shuffled = [...this.cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.cards = shuffled;
  }
  public static takeCard() {
    this.cards.pop()
    console.log('1 карта взята из стопки')
  }
}
