import {  useCallback, forwardRef } from "react";
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
    defend?: boolean,
    empty?: boolean,
    isRaised: boolean
}

const CardComponent = forwardRef<HTMLDivElement, Props> (({ value, suit, color, defend, empty, isRaised }, ref) => {

    const setSuitSrc = useCallback(() => {
        if(empty) return
        switch(suit) {
            case Suits.PEAK: return peak_img;
            case Suits.CROSS: return cross_img;
            case Suits.WORMS: return worms_img;
            case Suits.BUBA: return buba_img;
        }
    }, [suit])
    const setValueCard = useCallback(() => {
        if(empty) return
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
        <div ref={ref} draggable style={!suit ? { justifyContent: 'center' } : {}} className={`card-container ${defend ? 'defend-card' : ''} ${empty ? 'empty' : ''} ${isRaised ? 'maybe' : ''}`}>
            {!empty &&
                <>
            <div id="up" className="card-angle">
                <span className="card-value" style={{ color: color }}>{setValueCard()}</span>
                {suit && <img draggable={false} className="card-suit" src={setSuitSrc()} alt="suit" />}
            </div>
            {suit && <div id="down" className="card-angle">
                <span className="card-value" style={{ color: color }}>{setValueCard()}</span>
                <img draggable={false} className="card-suit" src={setSuitSrc()} alt="suit" />
            </div>}
                </>
            }
        </div>
    )
})

export default CardComponent