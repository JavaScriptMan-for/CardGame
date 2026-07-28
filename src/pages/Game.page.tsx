import { FC, useEffect, useState } from "react";
import '../styles/game.scss'
import Game from "../scripts/models/Game.model";
import Arm from "../scripts/models/Arm.model";
import CardComponent from "../components/Card.component";
import { Colors, Suits } from "../scripts/models/Card.model";

const GamePage: FC = () => {
    const [players, setPlayers] = useState<Arm[]>([])

    useEffect(() => {
       const count_players = Number(prompt("Сколько игроков будет играть?")) || 2

        setPlayers(Array.from({ length: count_players }, () => new Arm()));
    }, [])

    useEffect(() => {
        Game.startGame(players)
    }, [players])

    return (
        <div id="game" style={{ display: "flex" }}>
            
        </div>
    )
}

export default GamePage