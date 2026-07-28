import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/Main.page";
import GamePage from "./pages/Game.page";

export enum Links {
    INDEX='/',
    GAME='/game'
}

const App: FC = () => {
    return (
        <Routes>
            <Route path={Links.INDEX} Component={MainPage}/>
            <Route path={Links.GAME} Component={GamePage} />
        </Routes>
    )
}

export default App