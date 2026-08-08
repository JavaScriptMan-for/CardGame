import "../styles/arm.scss";
import { FC, useEffect, useState, useRef } from "react";
import CardComponent from "./Card.component";
import { CardType } from "../scripts/models/Card.model";
import Arm from "../scripts/models/Arm.model";

interface Props {
  player_id: number;
  cards: CardType[];
  index: number;
  isActivity: boolean;
  player: Arm
}

const ArmsComponent: FC<Props> = ({ player_id, cards, index, isActivity, player }) => {
  const [cardsState, setCardsState] = useState<CardType[]>([]);
  const cardsElements = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setCardsState(cards);
    console.log(cards);
  }, [cards]);

  useEffect(() => {
    cardsElements.current.forEach((el, index) => {
        el.ondblclick = (ev: Event) => {
            ev.preventDefault()
            player.go(index)
        }
    })
  }, [cardsState, cardsElements])
  return (
    <div
      style={index > 1 ? { alignSelf: "flex-end", order: index + 1 } : {}}
      className="arm"
    >
      <p className={`player_id ${isActivity ? "activity" : ""}`}>
        Игрок {player_id}
      </p>
      <div className="cards">
        {cardsState &&
          cardsState.map((card: CardType, index) => (
            <CardComponent
              ref={(el) => {
                cardsElements.current[index] = el!;
              }}
              key={index}
              suit={card.suit}
              color={card.color}
              value={card.value}
              isRaised={card.maybe}
            />
          ))}
      </div>
    </div>
  );
};

export default ArmsComponent;
