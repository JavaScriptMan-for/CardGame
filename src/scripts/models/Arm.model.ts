import { CardType } from "./Card.model";
import Deck from "./Deck.model";
import Game from "./Game.model";
import Table from "./Table.model";

export default class Arm {
  private static nextId: number = 1;
  public player_id: number;
  public readonly quantity: number;
  public cards: CardType[] = [];

  private can_go: boolean = false;
  private go_count: number = 0;
  private value_while_go: number | null = null;

  public isReady: boolean = false
  public static onUpdate: (() => void) | null = null; //from react

  public takeCards() {
    for (let i = this.cards.length; i < this.quantity; i++) {
      if (Deck.cards.length < 1) break;
      this.cards.push(Deck.cards[Deck.cards.length - 1]);
      Deck.takeCard();
    }
    for (const card of this.cards) {
      card.player_id = this.player_id;
    }
  }

  public upCards() {
    if(Game.testSwitchPlayer() === Game.active_player) return

    if(Table.cards.length < 1) {
      for(let i = 0; i < this.cards.length; i++) {
        this.cards[i].maybe = true
      }
      return
    } 
      for(let i = 0; i < this.cards.length; i++) {
        if(Table.values.some(value => value === this.cards[i].value)) {
          this.cards[i].maybe = true
        } else {
          this.cards[i].maybe = false
        }
    }

    Arm.onUpdate && Arm.onUpdate() 
}

  public upCardsWhileDefend() {
    if(Game.testSwitchPlayer() - 1 !== Game.active_player) {
      console.log(Game.testSwitchPlayer(), Game.active_player)
      return
    }
    const table_cards = Table.cards;
    for(let i = 0; i < this.cards.length; i++) {
      
      if(
        (table_cards.some(card => this.cards[i].value > card.value && this.cards[i].suit === card.suit))
         || 
        (this.cards[i].name === 'joker' && table_cards.some(card => this.cards[i].color === card.color))
         ||
         (this.cards[i].suit === Deck.trump_suit && table_cards.every(card => card.suit !== Deck.trump_suit))
      ) {
        this.cards[i].maybe = true
      } else {
        this.cards[i].maybe = false
      }
    }
  }

  public go(number_card: number) {
    if (!this.can_go) {
      console.log(`Ходит не игрок ${this.player_id}, а ${Game.active_player}`);
      return;
    }

    if (this.cards.length === 0) {
      console.log(`У игрока ${this.player_id} нет карт`);
      return;
    }

    const targetCard = this.cards[number_card];

    if(!targetCard.suit) return

    // Первый ход — фиксируем масть/значение
    if (this.go_count === 0) {
      this.value_while_go = targetCard.value;
      this.go_count++;
      Table.putCard(targetCard);
      this.cards.splice(number_card, 1);
      return;
    }

    // Второй и последующие ходы — проверяем масть
    if (targetCard.value !== this.value_while_go) {
      console.log("Нельзя положить карту другой масти/значения");
      return;
    }

    // Масть совпала — кладём
    this.go_count++;
    Table.putCard(targetCard);
    this.cards.splice(number_card, 1);
  }

  public ready() {
    this.isReady = true
    this.cards.forEach(card => {
        card.maybe = false
    })
  }

  public drop(number_card: number) {
    if(this.can_go) return
    if(Game.testSwitchPlayer() === this.player_id) return
    if(this.cards.length < 1) return

    if(Table.cards.length >= 6) return
    
    const targetCard = this.cards[number_card];
    if(!targetCard.suit) return

    const values = Table.values;

    if(!values.some(value => value === targetCard.value)) return

    Table.putCard(targetCard)
    this.cards.splice(number_card, 1);
  }

  public pull() {
    if(this.can_go) return
    if(Game.testSwitchPlayer() !== this.player_id) return

    this.cards.push(...Table.cards)
    for(const card of Table.defend_cards) {
      if(card) this.cards.push(card)
    }

    this.cards.forEach(card => card.maybe = false)

    Table.clearTable()
    
  }

  public defend(pos: number, number_card: number) {
    if(Game.testSwitchPlayer() !== this.player_id) return
    const targetCard = this.cards[number_card]
    console.log('targetCard', targetCard)
    const position = pos

    const baseCard = Table.cards[position];
    if (!baseCard) {
    console.warn("Нет карты на столе в позиции", position);
    return;
    }

    if(targetCard.name === 'joker' && targetCard.color === Table.cards[position].color) {
      Table.defend_cards[position] = targetCard
      this.cards.splice(number_card, 1);
      if (Table.onUpdate) Table.onUpdate();
      return 
    }

    if(
      (targetCard.suit === Table.cards[position].suit && targetCard.value > Table.cards[position].value)
      ||
      (targetCard.suit === Deck.trump_suit && Table.cards[position].suit !== Deck.trump_suit)
    ) {
      Table.defend_cards[position] = targetCard
      this.cards.splice(number_card, 1);
      if (Table.onUpdate) Table.onUpdate();
    } else {return}
  }

    public translation(card: CardType) {
      if(Game.testSwitchPlayer() !== this.player_id) return
      if(!Table.defend_cards.every(card => card === null)) return

      const tableCards = Table.cards

      if(tableCards.every(card => card.value === card.value)) {
        Table.putCard(card);
        Game.switchPlayer()
      }
    }

    public ticket(card: CardType) {
      if(Game.testSwitchPlayer() !== this.player_id) return
      if(card.suit !== Deck.trump_suit) return

      Game.switchPlayer()
    }

  constructor(quantity?: number) {
    this.player_id = Arm.nextId++;
    this.can_go = Game.active_player === this.player_id;
    this.quantity = quantity ? quantity : 6;
    Game.addPlayer(this.player_id);
  }
}
