import { Col, Container, Row } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GameContext from "../contexts/gameContext.js"
import API from "../API/API.mjs";
import { useContext } from "react";
import AuthContext from "../contexts/authContext.js";

function GameLayout() {
    const [gameInfo, setGameInfo] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const startGame = async () => {
            if (location.pathname === "/free/game") {
                const gameInfo = await API.startGame('easy');
                setGameInfo(gameInfo);
                navigate(`/free/game/${gameInfo.gameId}`);
            } else {
                const gameInfo = await API.startGame('normal');
                setGameInfo(gameInfo);
                navigate(`/${user.id}/game/${gameInfo.gameId}`);
            }
        }
        startGame();
    }, []);
    
    return (
        <Container fluid>
            <Row className="align-items-center">
                <Col lg={2}><LeftSidebar/></Col>
                <Col lg={8}>
                    <GameContext.Provider value={{gameInfo, setGameInfo}}>
                        <Outlet/>
                    </GameContext.Provider>
                </Col>
                <Col lg={2}><RightSidebar/></Col>
            </Row>
        </Container>
    )
}

export default GameLayout;