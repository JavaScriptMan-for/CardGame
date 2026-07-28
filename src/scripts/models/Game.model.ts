import Deck from "./Deck.model"
import Arm from "./Arm.model"

export default abstract class Game {
    public static players_id: number[] = []
    private static readonly min_players: number = 2
    private static readonly max_players: number = 5
    public static players: Arm[] = []

    public static active_player: number = 1 //id player

    public static switchPlayer() {
        if(this.active_player !== this.players_id.length) {
            this.active_player += 1 
        } else {
            this.active_player = 1
        }
        return this.active_player
    }

    public static startGame(players: Arm[]) {
        if(this.players_id.length < this.min_players) {
            console.error("Мало игроков")
            return
        }

        console.log("------Игра началась------")
        this.players.push(...players)
        if(players.length > this.max_players) {
            this.players.splice(this.max_players - 1)
            this.players_id.splice(this.max_players - 1) 
        }
        Deck.createDeck();
        Deck.mix();
    }

    public static addPlayer(player_id: number) {
        this.players_id.push(player_id)
    }
}