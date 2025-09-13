import { useContext } from "react";
import GameContext from "../../contexts/gameContext";
import AuthContext from "../../contexts/authContext";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { ConsonantsList, VowelsList } from "./LetterList";
import AnswerForm from "./AnswerForm";

function GameActions(props) {
    const { setGameInfo } = useContext(GameContext);
    const { user } = useContext(AuthContext);

    const goBackBtn = <Button onClick={() => props.setCurrentView('none')} variant="secondary">Go back</Button>;
    
    return(
        <Row className="mb-3 align-items-center">
            <Col className="d-flex justify-content-center">
                {props.currentView === 'consonants' ?
                    goBackBtn
                    : <Button variant="outline-dark" disabled={user?.coins === 0} onClick={() => props.setCurrentView('consonants')}>Guess a consonant</Button>}
            </Col>
            <Col  className="d-flex justify-content-center">
                {props.currentView === 'vowels' ?
                    goBackBtn
                    : <Button variant="outline-dark" disabled={props.vowelPresent || user?.coins === 0} onClick={() => props.setCurrentView('vowels')}>Guess a vowel</Button>}
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
    if (props.currentView === 'consonants' || props.currentView === 'vowels') {
        if (loggedIn) {
            alert = <Alert className="text-center w-100 p-1" variant="warning">If the letter is not present, its cost will be doubled!</Alert>;
        }
    } else if (props.currentView === 'none') {
        if (gameInfo?.present === false) {
            alert = <Alert className='text-center w-100 p-1' variant='danger'>{gameInfo?.msg}</Alert>;
        } else if (gameInfo?.present === true) {
            alert = <Alert className='text-center w-100 p-1' variant='success'>{gameInfo?.msg}</Alert>;
        } else if (gameInfo?.correct === false) {
            alert = <Alert className='text-center w-100 p-1' variant="danger">{gameInfo?.msg}</Alert>;
        }
    }
    
    return(
        <>{alert}</>
    )
}

function UserInput(props) {

    const consonantsArr = [[], [], [], [], []];
    props.letters
        .filter(l => l.type === 'consonant')
        .reduce((groups, letter) => {
            groups[letter.cost - 1].push(letter);
            return groups;
        }, consonantsArr);

    const vowels = props.letters.filter(l => l.type === 'vowel');

    return(
        <>
        {props.currentView === 'answer' && <AnswerForm setCurrentView={props.setCurrentView}/>}
        {props.currentView === 'consonants' && <ConsonantsList consonants={consonantsArr} setCurrentView={props.setCurrentView}/>}
        {props.currentView === 'vowels' && <VowelsList vowels={vowels} setCurrentView={props.setCurrentView} setVowelPresent={props.setVowelPresent}/>}
        </>
    )
}

export {GameActions, GameAlerts, UserInput};