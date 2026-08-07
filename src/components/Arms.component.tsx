import "../styles/arm.scss"
import { FC, useEffect, useState } from "react";
import CardComponent from "./Card.component";
import { CardType } from "../scripts/models/Card.model";

interface Props {
    player_id: number,
    cards: CardType[],
    index: number,
    isActivity: boolean
}

const ArmsComponent: FC<Props> = ({ player_id, cards, index, isActivity }) => {
    const [cardsState, setCardsState] = useState<CardType[]>([])
    useEffect(() => {
        setCardsState(cards)
        console.log(cards)
    }, [cards])
    return (
        <div style={ index > 1 ? { alignSelf: 'flex-end', order: index + 1} : {}} className="arm">
            <p className={`player_id ${isActivity ? 'activity' : ''}`}>Игрок {player_id}</p>
            <div className="cards">
            { cardsState &&
                cardsState.map((card: CardType, index) => 
                    <CardComponent key={index} suit={card.suit} color={card.color} value={card.value}/>
                )
            }
            </div>
        </div>
    )
}

export default ArmsComponent