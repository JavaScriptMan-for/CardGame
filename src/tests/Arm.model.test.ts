import Arm from "../scripts/models/Arm.model";
import Game from "../scripts/models/Game.model";
import Table from "../scripts/models/Table.model";

describe('Arm class', () => {
    const player1 = new Arm();
    const player2 = new Arm();
    const player3 = new Arm();

    Game.startGame([player1, player2, player3])
    player1.takeCards();
    player2.takeCards();
    player3.takeCards()

    test('go', () => {
        player1.go(0)   
        expect(Table.cards.length).toBe(1)
    })
    test('defend', () => {
        player1.go(0)
        player2.upCardsWhileDefend()

        for(let i = 0; i < player2.cards.length; i++) {
            if(player2.cards[i].maybe === true) {
                player2.defend(0, i)
                break;
            }
        }
        if(player2.cards.filter(card => card.maybe === true).length < 1) {
            console.warn("Не нашлась карта для обороны");
            expect(true).toBe(true)
        } else {
            expect(Table.defend_cards.length).toBe(1)
            expect(
                (Table.cards[0].suit === Table.defend_cards[0]?.suit || Table.cards[0].color === Table.defend_cards[0]?.color)
                 && Table.defend_cards[0].value > Table.cards[0].value)
            .toBe(true)
        }
    })
})