import { FC, useCallback } from "react";
import { Colors, Suits } from "../scripts/models/Card.model";
import "../styles/card.scss"

import peak_img from "../assets/peak.png";
import cross_img from "../assets/cross.png"
import worms_img from "../assets/worms.png"
import buba_img from "../assets/buba.png"

interface Props {
    value: number,
    suit: Suits | null,
    color: Colors,
    key?: number
}

const CardComponent: FC<Props> = ({ value, suit, color, key }) => {

    const setSuitSrc = useCallback(() => {
        switch(suit) {
            case Suits.PEAK: return peak_img;
            case Suits.CROSS: return cross_img;
            case Suits.WORMS: return worms_img;
            case Suits.BUBA: return buba_img;
        }
    }, [suit])
    const setValueCard = useCallback(() => {
        switch(value) {
            case 11: return 'J';
            case 12: return 'Q';
            case 13: return 'K';
            case 14: return 'A';
            case 15: return 'Joker';
            default: return value.toString()
        }
    }, [value])

    return (
        <div key={key ? key : Date.now()} draggable style={!suit ? { justifyContent: 'center' } : {}} className="card-container">
            <div id="up" className="card-angle">
                <span className="card-value" style={{ color: color }}>{setValueCard()}</span>
                {suit && <img draggable={false} className="card-suit" src={setSuitSrc()} alt="suit" />}
            </div>
            {suit && <div id="down" className="card-angle">
                <span className="card-value" style={{ color: color }}>{setValueCard()}</span>
                <img draggable={false} className="card-suit" src={setSuitSrc()} alt="suit" />
            </div>}
        </div>
    )
}

export default CardComponent