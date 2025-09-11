import { Col, Container, Row } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import GameContext from "../../contexts/gameContext.js"
import API from "../../API/API.mjs";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext.js";
import { decreaseTimer } from "../../../server/gameLogic.mjs";

function GameLayout() {
    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const initialGameInfo = {game: null, present: null, correct: null, status: null, msg: null}

    const [gameInfo, setGameInfo] = useState(initialGameInfo);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let intervalId;
        gameInfo.status !== null && setGameInfo(initialGameInfo);   //reset prima di iniziare un'altra partita (tranne la prima volta)

        const startGame = async () => {
            
            const gameInfo = await API.startGame();
            setGameInfo(gameInfo);

            user ?
            navigate(`/users/${user.id}/game/${gameInfo.game.gameId}`)
            : navigate(`/free/game/${gameInfo.game.gameId}`);
           
            intervalId = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = decreaseTimer(prevTimer);
                    newTimer === 0 && setGameInfo(prev => ({...prev, status: 'timeout'}));
                    return newTimer;
                });    
            }, 1000);
        };

        startGame();

        return () => {
            if (intervalId) clearInterval(intervalId);  //quando smonto il componente disattivo il timer
        };
    }, []);

    useEffect(() => {
        if (gameInfo.status === 'timeout' || gameInfo.status === 'won' || gameInfo.status === 'ended') {
            endGame(); 
        }
    }, [gameInfo.status]);

    const guessLetter = async (gameId, letter) => {
        const res = await API.guessLetter(gameId, letter);
        setGameInfo(res.gameInfo);
        setUser(res.user);
    }

    const guessPhrase = async (gameId, phrase) => {
        const res = await API.guessPhrase(gameId, phrase);
        setGameInfo(res.gameInfo);
        setUser(res.user);
    }

    const endGame = async () => {
        const updatedUser = await API.endGame(gameInfo.game.gameId, gameInfo.status);
        setUser(updatedUser);

        user ? 
            navigate(`/users/${user.id}`, {state: {status: gameInfo.status}})
            : navigate(`/`, {state: {status: gameInfo.status}});
    }
    
    return (
        <Container fluid>
            <Row className="align-items-center">
                <Col lg={2}><LeftSidebar timer={timer}/></Col>
                <Col lg={8}>
                <GameContext.Provider value={{gameInfo, setGameInfo, guessLetter, guessPhrase, endGame}}>
                    <Outlet/>
                </GameContext.Provider>
                </Col>
                <Col lg={2}><RightSidebar/></Col>
            </Row>
        </Container>
    )
}

export default GameLayout;