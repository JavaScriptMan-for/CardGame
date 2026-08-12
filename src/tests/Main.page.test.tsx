import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import MainPage from "../pages/Main.page"

describe('main page', () => {
    test('have elements', () => {
        render(
        <MemoryRouter>
            <MainPage />
        </MemoryRouter>
        )
        const h1 = screen.getByText(/Карточная игра Дурак/g)
        expect(h1).toBeInTheDocument();
    })
})