import { FC, useEffect, useState } from "react";
import '../styles/game.scss'
import ArmsComponent from "../components/Arms.component";
import Game from "../scripts/models/Game.model";
import Arm from "../scripts/models/Arm.model";
import Table from "../scripts/models/Table.model";
import CardComponent from "../components/Card.component";
import { CardType } from "../scripts/models/Card.model";



const GamePage: FC = () => {
    const [players, setPlayers] = useState<Arm[]>([])

    const [tableCards, setTableCards] = useState<CardType[]>([])
    const [defendTableCards, setDefendTableCards] = useState<(CardType | undefined)[]>([])

    useEffect(() => {
       const count_players = 3 //Number(prompt("Сколько игроков будет играть?")) || 2 
        const newPlayers = Array.from({ length: count_players }, () => new Arm())
        setPlayers(newPlayers);
        Game.startGame(newPlayers)
    }, [])



    useEffect(() => {
        players.forEach(player => {
            player.takeCards()
        })
    }, [players])

    useEffect(() => {
        setTableCards(Table.cards)
    }, [Table.cards])
    useEffect(() => {
        setDefendTableCards(Table.defend_cards)
    }, [Table.defend_cards])

    // useLog(Deck.cards, 'deck cards')

    useEffect(() => {
        if(players.length >= 3) {
            players[0].go(2)
        }
    }, [players])

    return (
        <div id="game" style={{ display: "flex" }}>
            <div id="table">
                { tableCards.map((card, index) => 
                    <CardComponent key={index} suit={card.suit} color={card.color} value={card.value}/>
                )
                }
                
            </div>
            {players.map((player: Arm, index) => 
                <ArmsComponent index={index} key={index} player_id={player.player_id} cards={player.cards}/>
            )}
        </div>
    )
}

export default GamePage