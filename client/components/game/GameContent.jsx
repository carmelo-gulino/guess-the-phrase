import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import GameContext from "../../contexts/gameContext";
import AuthContext from "../../contexts/authContext";
import GameGrid from "./GameGrid";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import API from "../../API/API.mjs";
import { decreaseTimer } from "../../../server/gameLogic.mjs";
import { GameActions, GameAlerts, UserInput } from "./GameInputs";

function GameContent(props) {
    const [currentView, setCurrentView] = useState('none');
    const [vowelPresent, setVowelPresent] = useState(false);
    const [letters, setLetters] = useState([]);

    const {gameId} = useParams();

    const { user } = useContext(AuthContext);
    const {gameInfo, setGameInfo, endGame} = useContext(GameContext);

    const navigate = useNavigate();

    useEffect(() => {

        const startGame = async () => {
            
            const res = await API.startGame();
            setGameInfo(res.gameInfo);
            setLetters(res.letters);

            user ?
            navigate(`/users/${user.id}/game/${res.gameInfo.game.gameId}`)
            : navigate(`/free/game/${res.gameInfo.game.gameId}`);
        };

        startGame();
        
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            props.setTimer(prevTimer => {
                const newTimer = decreaseTimer(prevTimer);
                newTimer === 0 && setGameInfo(prev => ({...prev, status: 'timeout'}));
                return newTimer;
            });    
        }, 1000);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                props.setTimer(60);
            };
        };

    }, [gameId]);

    useEffect(() => {
        if (gameInfo.status === 'timeout' || gameInfo.status === 'won' || gameInfo.status === 'ended') {
            endGame(); 
        }
    }, [gameInfo.status]);

    return (
        <>
        <GameActions currentView={currentView} setCurrentView={setCurrentView} setVowelPresent={setVowelPresent} vowelPresent={vowelPresent}/>
        <Row className="align-items-center">
            <Col>
                <GameAlerts currentView={currentView}/>
                <GameGrid/>
            </Col>
        </Row>
        <Row className="align-items-center">
            <Col>
                <UserInput letters={letters} setVowelPresent={setVowelPresent} currentView={currentView} setCurrentView={setCurrentView}/>
            </Col>
        </Row>
        </>
    )
}

export default GameContent;