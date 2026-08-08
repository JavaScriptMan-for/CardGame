import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Links } from "../App";
import "../styles/main.scss"

const MainPage: FC = () => {
    const nav = useNavigate()

    return (
        <div id="main_page">
            <h1>Карточная игра Дурак</h1>
            <h2>Добро пожаловать!</h2>
            <button onClick={() => nav(Links.GAME)} type="button">Начать игру</button>
        </div>
    )
}

export default MainPage