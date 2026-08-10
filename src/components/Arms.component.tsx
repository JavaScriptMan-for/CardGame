import "../styles/arm.scss";
import { FC, useEffect, useState, useRef, RefObject, Dispatch, SetStateAction} from "react";
import CardComponent from "./Card.component";
import { CardType } from "../scripts/models/Card.model";
import Arm from "../scripts/models/Arm.model";
import Game from "../scripts/models/Game.model";
import { useLog } from "../hooks/useLog";

interface Props {
  player_id: number;
  cards: CardType[];
  index: number;
  isActivity: boolean;
  player: Arm;
  tableCardsRef: RefObject<HTMLDivElement[]>;
  setPlayers: Dispatch<SetStateAction<Arm[]>>
}

const ArmsComponent: FC<Props> = ({
  player_id,
  cards,
  index,
  isActivity,
  player,
  tableCardsRef,
  setPlayers
}) => {
  const [cardsState, setCardsState] = useState<CardType[]>([]);
  const cardsElements = useRef<HTMLDivElement[]>([]);

  const [targetCard, setTargetCard] = useState<number | null>(null);
  const [targetAttack, setTargetAttack] = useState<number | null>(null);
  

  useEffect(() => {
    setCardsState(cards);
    console.log(cards);
  }, [cards]);

  useEffect(() => {
  if (player_id !== Game.active_player) return;

  player.upCards();

  Arm.onUpdate = () => {
    setPlayers(Game.players)
  }

  cardsElements.current.forEach((el, index) => {
    if (!el) return; // ← защита от null
    el.ondblclick = (ev: Event) => {
      ev.preventDefault();
      player.go(index);
    };
  });
}, [cardsState.length]);

  useEffect(() => {
    if (Game.testSwitchPlayer() !== player_id) return;

    player.upCardsWhileDefend()
    cardsElements.current.forEach((el, index) => {
      if (!el) return;
      el.onclick = () => setTargetCard(index);
    });

    tableCardsRef.current.forEach((el, index) => {
      if (!el) return;
      el.onclick = () => {
        setTargetAttack(index);
      };
    });
  }, [cardsState.length, tableCardsRef.current.length]);

  useEffect(() => {
    if(targetCard === null || targetAttack === null) return
    player.defend(targetAttack, targetCard)
  }, [targetCard, targetAttack])

  useLog(targetCard, targetAttack, 'defend')
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
