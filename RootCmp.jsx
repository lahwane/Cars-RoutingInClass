const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"
import { CarDetails } from "./pages/CarDetails.jsx"
import { Team } from "./cmps/Team.jsx"
import { Vision } from "./cmps/Vision.jsx"
import { CarEdit } from "./pages/CarEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/about" element={<About />} >
                            <Route index element={<Team />} />
                            <Route path="team" element={<Team />} />
                            <Route path="vision" element={<Vision />} />
                        </Route>

                        <Route path="/car" element={<CarIndex />} />
                        <Route path="/car/:carId" element={<CarDetails />} />
                        <Route path="/car/edit" element={<CarEdit />} />
                        <Route path="/car/edit/:carId" element={<CarEdit />} />
                    </Routes>
                </main>

                <UserMsg />
            </section>
        </Router>
    )
} 