import "bootstrap-icons/font/bootstrap-icons.css";
import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useContext, useState } from "react";
import GameContext from "../../contexts/gameContext";
import AuthContext from "../../contexts/authContext";
import GameGrid from "./GameGrid";
import { ConsonantsList, VowelsList } from "./LetterList";

function GameContent() {
    const [currentView, setCurrentView] = useState('none');
    const [vowelPresent, setVowelPresent] = useState(false);

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
                <GameInput currentView={currentView} setCurrentView={setCurrentView}/>
            </Col>
        </Row>
        </>
    )
}

function GameActions(props) {
    const { setGameInfo } = useContext(GameContext);

    const goBackBtn = <Button onClick={() => props.setCurrentView('none')} variant="secondary">Go back</Button>;
    
    return(
        <Row className="mb-3 align-items-center">
            <Col className="d-flex justify-content-center">
                {props.currentView === 'consonants' ?
                    goBackBtn
                    : <Button variant="outline-dark" onClick={() => props.setCurrentView('consonants')}>Guess a consonant</Button>}
            </Col>
            <Col  className="d-flex justify-content-center">
                {props.currentView === 'vowels' ?
                    goBackBtn
                    : <Button variant="outline-dark" disabled={props.vowelPresent} onClick={() => props.setCurrentView('vowels')}>Guess a vowel</Button>}
            </Col>
            <Col  className="d-flex justify-content-center">
                    {props.currentView === 'answer' ? 
                        goBackBtn
                        : <Button variant="outline-dark" onClick={() => props.setCurrentView('answer')}>Guess the phrase</Button>}
            </Col>
            <Col  className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => setGameInfo(prev => ({...prev, status: 'ended'}))}>Leave the game</Button>
            </Col>
        </Row>
    )
}

function GameAlerts(props) {
    const {loggedIn} = useContext(AuthContext);
    const {gameInfo} = useContext(GameContext);

    let alert;
    if ((props.currentView === 'consonants' || props.currentView === 'vowels')) {
        if (loggedIn) {
            alert = <Alert className="text-center w-25 p-1" variant="warning">If the letter is not present, its cost will be doubled!</Alert>;
        }
    } else if (props.currentView === 'none') {
        if (gameInfo?.present === false) {
            alert = <Alert className='text-center w-25 p-1' variant='danger'>{gameInfo?.msg}</Alert>;
        } else if (gameInfo?.present === true) {
            alert = <Alert className='text-center w-25 p-1' variant='success'>{gameInfo?.msg}</Alert>;
        } else if (gameInfo?.correct === false) {
            alert = <Alert className='text-center w-25 p-1' variant="danger">{gameInfo?.msg}</Alert>;
        }
    }
    
    return(
        <>{alert}</>
    )
}

function GameInput(props) {

    return(
        <>
        {props.currentView === 'answer' && <AnswerForm setCurrentView={props.setCurrentView}/>}
        {props.currentView === 'consonants' && <ConsonantsList setCurrentView={props.setCurrentView}/>}
        {props.currentView === 'vowels' && <VowelsList setCurrentView={props.setCurrentView} setVowelPresent={props.setVowelPresent}/>}
        </>
    )
}

export default GameContent;