import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/Main.page";

export enum Links {
    INDEX='/'
}

const App: FC = () => {
    return (
        <Routes>
            <Route path={Links.INDEX} Component={MainPage}/>
        </Routes>
    )
}

export default App