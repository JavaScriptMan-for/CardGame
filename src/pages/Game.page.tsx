import { FC, useEffect, useState } from "react";
import '../styles/game.scss'
import ArmsComponent from "../components/Arms.component";
import Game from "../scripts/models/Game.model";
import Arm from "../scripts/models/Arm.model";
import Table from "../scripts/models/Table.model";
import CardComponent from "../components/Card.component";
import { CardType, Colors } from "../scripts/models/Card.model";



const GamePage: FC = () => {
    const [players, setPlayers] = useState<Arm[]>([])

    const [tableCards, setTableCards] = useState<CardType[]>([])
    const [defendTableCards, setDefendTableCards] = useState<(CardType | null)[]>([])

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
    Table.onUpdate = () => {
        setTableCards([...Table.cards]);
        setDefendTableCards([...Table.defend_cards]);
    };

    return () => {
        Table.onUpdate = null;
    };
}, [players]);

    useEffect(() => {
        if(players.length < 3) return
        players[0].upCards()
        Arm.onUpdate = () => {
            setPlayers(Game.players)
        }
    }, [players, tableCards])

//     useEffect(() => {
//     if(players.length >= 3 && players.every(player => player.cards.length === 6)) {

//         players[0].go(2)
//         players[1].upCardsWhileDefend()

//         console.log(players[1].cards, 'test')

//         for(let i = 0; i < players[1].cards.length; i++) {
//             if(players[1].cards[i].maybe === true) {
//                 console.log(i, 'tt')
//                 console.log(players[1].defend(1, i))
//                 players[1].defend(0, i)
//                 break;
//             }
//         }
//         if(players[1].cards.every(card => card.maybe === false)) {
//             players[1].pull()
//         }
//     }
// }, [players])

    return (
        <div id="game" style={{ display: "flex" }}>
            <div id="table">
                {/**table cards */}
                <div id="cards">      
                { tableCards.map((card, index) => 
                    <CardComponent key={index} suit={card.suit} color={card.color} value={card.value} isRaised={card.maybe}/>
                )
                }
                </div>
                <div id="defend-cards">
                { defendTableCards.map((defendCard, index) =>
                <div key={index}>
                {defendCard === null ? 
                    <CardComponent key={index} value={0} suit={null} color={Colors.BLACK} defend empty isRaised={false}/>
                    :
                    <CardComponent key={index} value={defendCard.value} suit={defendCard.suit} color={defendCard.color} defend isRaised={defendCard.maybe}/>
                }    
                </div> 
                )
                }
                </div>          
            </div>
            {players.map((player: Arm, index) => 
                <ArmsComponent player={players[index]} index={index} key={index} player_id={player.player_id} cards={player.cards} isActivity={!!(Game.active_player === player.player_id)}/>
            )}
        </div>
    )
}

export default GamePage