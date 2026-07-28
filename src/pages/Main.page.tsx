import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Links } from "../App";

const MainPage: FC = () => {
    const nav = useNavigate()

    return (
        <>
         <button onClick={() => nav(Links.GAME)} type="button">Начать игру</button>
        </>
    )
}

export default MainPage