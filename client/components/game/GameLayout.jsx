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

    const initialGameInfo = {game: null, user: user, present: null, correct: null, status: null, msg: null}

    const [gameInfo, setGameInfo] = useState(initialGameInfo);
    const [timer, setTimer] = useState(60);
    

    useEffect(() => {
        let intervalId;
        gameInfo.status !== null && setGameInfo(initialGameInfo);   //reset prima di iniziare un'altra partita

        const startGame = async () => {
            const gameInfo = user ?
                await API.startGame('normal')
                : await API.startGame('easy');

            setGameInfo(gameInfo);

            user ?
            navigate(`/users/${user.id}/game/${gameInfo.game.gameId}`)
            : navigate(`/free/game/${gameInfo.game.gameId}`);
           
            /*intervalId = setInterval(() => {
                const newTimer = decreaseTimer(timer);
                setTimer(newTimer);
                console.log(newTimer);
            }, 1000);*/
        }
        startGame();
        /*return () => {
            if (intervalId) clearInterval(intervalId);  //quando smonto il componente disattivo il timer
            console.log("timer fermato");
        };*/
    }, []);

    useEffect(() => {
        if(gameInfo.status === 'won' || gameInfo.status === 'ended') {
            endGame();
        }
    }, [gameInfo.status]);

    const guessLetter = async (gameId, letter, cost) => {
        const newGameInfo = await API.guessLetter(gameId, letter, cost);
        setGameInfo(newGameInfo);
        setUser(newGameInfo.user);
    }

    const guessPhrase = async (gameId, phrase) => {
        const newGameInfo = await API.guessPhrase(gameId, phrase);
        setGameInfo(newGameInfo);
        setUser(newGameInfo.user);
    }

    const endGame = async () => {
        await API.endGame(gameInfo.game.gameId);
        await API.updateCoins(user?.id, user?.coins);

        user ? 
            navigate(`/users/${user.id}`, {state: {gameStatus: gameInfo.status}})
            : navigate(`/`, {state: {gameStatus: gameInfo.status}});
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