import "./styles/style.scss"
import Deck from "./models/Deck.model"
import Arm from "./models/Arm.model"

Deck.createDeck()
Deck.mix()

const arm1 = new Arm()
const arm2 = new Arm()

arm1.takeCards()
arm2.takeCards()

console.log(arm1, arm2)
