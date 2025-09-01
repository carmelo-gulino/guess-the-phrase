import { Col, Container, Row } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GameContext from "../contexts/gameContext.js"
import API from "../API/API.mjs";
import { useContext } from "react";
import AuthContext from "../contexts/authContext.js";
import { decreaseTimer } from "../../server/gameLogic.js";

function GameLayout() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [gameInfo, setGameInfo] = useState({game: null, user: user});
    

    useEffect(() => {
        let intervalId;
        const startGame = async () => {
            const gameInfo = user ?
                await API.startGame('normal')
                : await API.startGame('easy');

            setGameInfo(gameInfo);

            user ?
            navigate(`/users/${user.id}/game/${gameInfo.game.gameId}`)
            : navigate(`/free/game/${gameInfo.game.gameId}`);
           
            intervalId = setInterval(() => {
                const newGameInfo = decreaseTimer(gameInfo);
                setGameInfo(newGameInfo);
            }, 1000);
        }
        startGame();
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const endGame = () => {
        
    }
    
    return (
        <Container fluid>
            <GameContext.Provider value={{gameInfo, setGameInfo}}>
                <Row className="align-items-center">
                    <Col lg={2}><LeftSidebar/></Col>
                    <Col lg={8}><Outlet/></Col>
                    <Col lg={2}><RightSidebar/></Col>
                </Row>
            </GameContext.Provider>
        </Container>
    )
}

export default GameLayout;