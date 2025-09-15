import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import GameContext from "../../contexts/gameContext";
import AuthContext from '../../contexts/authContext';

function ConsonantsList(props) {

    return(
        <>
        {props.consonants.map((arr, index) => (
            <Row key={`consonantsRow - ${index}`} className="mt-2">
                <Col>
                    <LetterActions letters={arr} cost={index+1} setCurrentView={props.setCurrentView}/>
                </Col>
            </Row>
        ))}
        </>
    )
}

function VowelsList(props) {
    
    return(
        <Row>
            <Col>
                <div className="d-flex">
                    <LetterActions letters={props.vowels} cost={10} setCurrentView={props.setCurrentView} setVowelPresent={props.setVowelPresent}/>
                </div>
            </Col>
        </Row>
    )
}

function LetterActions(props) {
    const { gameInfo, guessLetter } = useContext(GameContext);
    const {user} = useContext(AuthContext);

    const onClickLetter = (gameId, letter, type) => {
        guessLetter(gameId, letter);
        props.setCurrentView('none');
        type === 'vowel' && props.setVowelPresent(true);
    }

    return(
        <div className="d-flex">
            {user && <span className="me-2"><i className="bi bi-coin text-warning fs-3"></i> <strong className="fs-5">x{props.cost}:</strong></span>}
            {props.letters.map(l => (
                <Button className="me-1" variant="outline-dark" key={ l.type === 'consonant' ? `consonantsButton-${l.symbol}` : `vowelsButton-${l.symbol}`} 
                disabled={gameInfo.game.guessedLetters.includes(l.symbol)}
                onClick={() => onClickLetter(gameInfo.game.gameId, l.symbol, l.type)}>{l.symbol}</Button>
            ))}
        </div>
    )
}

export {ConsonantsList, VowelsList};