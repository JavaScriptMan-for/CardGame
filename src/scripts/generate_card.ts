import { Suits, Colors } from "./models/Card.model";
import "./styles/card.scss"

export default function GenerateCardImage(suit: Suits, value: number, color: Colors) {
    const card_container = document.createElement('div')
    card_container.classList.add('card-container')
    
    const peak_src = './src/assets/peak.png'
    const cross_src = './src/assets/cross.png'
    const worms_src = './src/assets/worms.png'
    const buba_src = './src/assets/buba.png'

    const suit_image = new Image()
    suit_image.classList.add('suit-card')
    switch(suit) {
        case Suits.PEAK: suit_image.src = peak_src; break;
        case Suits.CROSS: suit_image.src = cross_src; break;
        case Suits.WORMS: suit_image.src = worms_src; break;
        case Suits.BUBA: suit_image.src = buba_src; break;
        default: worms_src
    }

    const card_value = document.createElement('p')
    let card_value_text: string = '';
    card_value.classList.add('card-value')

    switch(value) {
        case 11: card_value_text = 'J'; break;
        case 12: card_value_text = 'Q'; break;
        case 13: card_value_text = 'K'; break;
        case 14: card_value_text = 'A'; break;
        case 15: card_value_text = 'Joker'; break;
        default: card_value_text = value.toString()
    }
    card_value.innerText = card_value_text;
    card_value.style.color = color

    card_container.append(suit_image)
    card_container.append(card_value)

    return card_container;
}