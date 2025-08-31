import { Button, Col, Row, Table } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useContext, useState } from "react";
import GameContext from "../contexts/gameContext";
import API from "../API/API.mjs";

function GameGrid() {

    return (
        <Table striped="columns" bordered>
            <tbody>
                {Array.from({length:6}).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({length: 10}).map((_, colIndex) => (
                            <td className="text-center align-middle fs-4" key={`${rowIndex}-${colIndex}`}>
                                <CellContent index={rowIndex*10+colIndex}/>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

function CellContent(props) {
    const {gameInfo} = useContext(GameContext);

    return(
        <>
        {gameInfo?.blanks?.includes(props.index) ? ' ' : 
        gameInfo?.revealed?.[props.index] ? gameInfo.revealed[props.index] : ''}
        </>
    )
}

function VowelsList(props) {
    const {gameInfo} = useContext(GameContext);
    
    return(
        <Row>
            <Col>
                <div className="d-flex">
                    <span className="me-2"><img height="40" src="../img/coin.png"/> x10:</span>
                    {['A', 'E', 'I', 'O', 'U'].map(l => (
                        <Button className="me-1" variant="outline-dark" 
                        onClick={() => {props.guessLetter(gameInfo.gameId, l); props.setVowelPresent(true);}} key={`vowelsButton-${l}`}>{l}</Button>
                    ))}
                </div>
            </Col>
        </Row>
    )
}

function ConsonantsList(props) {
    const {gameInfo} = useContext(GameContext);

    return(
        <>
        {[
            ['Z', 'Q', 'X', 'J', 'K'],
            ['V', 'B', 'P', 'G'],
            ['F', 'Y', 'W', 'M', 'C'],
            ['R', 'L', 'D', 'H', 'S'],
            ['T', 'N']
        ].map((arr, index) => (
            <Row key={`consonantsRow - ${index}`} className="mt-2">
                <Col>
                    <div className="d-flex">
                        {index == 0 && <span className="me-2"><img height="40" src="../img/coin.png"/> x1:</span>}
                        {index == 1 && <span className="me-2"><img height="40" src="../img/coin.png"/> x2:</span>}
                        {index == 2 && <span className="me-2"><img height="40" src="../img/coin.png"/> x3:</span>}
                        {index == 3 && <span className="me-2"><img height="40" src="../img/coin.png"/> x4:</span>}
                        {index == 4 && <span className="me-2"><img height="40" src="../img/coin.png"/> x5:</span>}
                        {arr.map(l => (
                            <Button className="me-1" variant="outline-dark" key={`consonantsButton-${l}`} 
                            onClick={() => props.guessLetter(gameInfo.gameId, l)}>{l}</Button>
                        ))}
                    </div>
                </Col>
            </Row>
        ))}
        </>
    )
}

function GameActions(props) {

    return(
        <Row className="mb-3 align-items-center">
            <Col className="d-flex justify-content-center">
                <Button variant="outline-dark" onClick={() => props.setCurrentView('consonants')}>Guess a consonant</Button>
            </Col>
            <Col  className="d-flex justify-content-center">
                <Button variant="outline-dark" disabled={props.vowelPresent} onClick={() => props.setCurrentView('vowels')}>Guess a vowel</Button>
            </Col>
            <Col  className="d-flex justify-content-center">
                <Button variant="outline-dark" onClick={() => props.setCurrentView('answer')}>Guess the phrase</Button>
            </Col>
            <Col  className="d-flex justify-content-center">
                <Button variant="danger outline-dark">Leave the game</Button>
            </Col>
        </Row>
    )
}

function GameContent() {
    const [currentView, setCurrentView] = useState('none');
    const [vowelPresent, setVowelPresent] = useState(false);

    const {gameInfo, setGameInfo} = useContext(GameContext);

    const guessLetter = async (gameId, letter) => {
        const newGameInfo = await API.guessLetter(gameId, letter);
        setGameInfo(newGameInfo);
        setCurrentView('none');
    }

    return (
        <>
        <GameActions setCurrentView={setCurrentView} setVowelPresent={setVowelPresent} vowelPresent={vowelPresent}/>
        <Row className="align-items-center">
            <Col><GameGrid/></Col>
        </Row>
        <Row className="align-items-center">
            <Col>
                {currentView === 'answer' && <AnswerForm setCurrentView={setCurrentView}/>}
                {currentView === 'consonants' && <ConsonantsList guessLetter={guessLetter}/>}
                {currentView === 'vowels' && <VowelsList guessLetter={guessLetter} setVowelPresent={setVowelPresent}/>}
            </Col>
        </Row>
        </>
    )
}

export default GameContent;