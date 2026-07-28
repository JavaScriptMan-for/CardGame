import Game from "./models/Game.model"
import Arm from "./models/Arm.model"
import Table from "./models/Table.model";


const player1 = new Arm();
const player2 = new Arm();
const player3 = new Arm();

Game.startGame([player1, player1, player3])


player1.takeCards()
player2.takeCards()
console.log('Карты сначала', player1.cards)

player1.go(2)
player1.upCards()



console.log('Карты после хода', player1.cards)
console.log('Карты на столе', Table.cards)

player2.pull()

console.log(player2.cards)
console.log(Table.defend_cards)
console.log(Table.cards)