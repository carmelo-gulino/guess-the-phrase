import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useContext, useState } from "react";
import GameContext from "../contexts/gameContext";
import AuthContext from "../contexts/authContext";

function GameContent() {
    const [currentView, setCurrentView] = useState('none');
    const [vowelPresent, setVowelPresent] = useState(false);

    const { loggedIn } = useContext(AuthContext);
    const { gameInfo } = useContext(GameContext);

    return (
        <>
        <GameActions currentView={currentView} setCurrentView={setCurrentView} setVowelPresent={setVowelPresent} vowelPresent={vowelPresent}/>
        {(loggedIn && (currentView === 'consonants' || currentView === 'vowels')) && <Alert className="text-center" variant="warning">If the letter is not present, its cost will be doubled!</Alert>}
        <Row className="align-items-center">
            <Col><GameGrid/></Col>
        </Row>
        <Row className="align-items-center">
            <Col>
                {gameInfo?.present ? <Alert dismissible variant="success">Ok!</Alert> : <Alert dismissible variant="danger">Nope!</Alert>}
                {gameInfo?.correct === false && <Alert dismissible variant="danger">The phrase is not correct!</Alert>}
                {currentView === 'answer' && <AnswerForm setCurrentView={setCurrentView}/>}
                {currentView === 'consonants' && <ConsonantsList setCurrentView={setCurrentView}/>}
                {currentView === 'vowels' && <VowelsList setCurrentView={setCurrentView} setVowelPresent={setVowelPresent}/>}
            </Col>
        </Row>
        </>
    )
}

function GameActions(props) {
    const { endGame } = useContext(GameContext);

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
                <Button variant="danger" onClick={() => endGame()}>Leave the game</Button>
            </Col>
        </Row>
    )
}

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
        {gameInfo?.game?.blanks?.includes(props.index) ? ' ' : 
        gameInfo?.game?.revealed?.[props.index] ? gameInfo.game.revealed[props.index] : ''}
        </>
    )
}

function VowelsList(props) {
    const { gameInfo, guessLetter } = useContext(GameContext);
    
    return(
        <Row>
            <Col>
                <div className="d-flex">
                    <span className="me-2"><img height="40" src="../img/coin.png"/> x10:</span>
                    {['A', 'E', 'I', 'O', 'U'].map(l => (
                        <Button className="me-1" variant="outline-dark" 
                        onClick={() => {guessLetter(gameInfo.game.gameId, l, 10); props.setVowelPresent(true); props.setCurrentView('none');}} key={`vowelsButton-${l}`}>{l}</Button>
                    ))}
                </div>
            </Col>
        </Row>
    )
}

function ConsonantsList(props) {
    const { gameInfo, guessLetter } = useContext(GameContext);

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
                            disabled={gameInfo.game.guessedLetters.includes(l)}
                            onClick={() => {guessLetter(gameInfo.game.gameId, l, index+1); props.setCurrentView('none'); }}>{l}</Button>
                        ))}
                    </div>
                </Col>
            </Row>
        ))}
        </>
    )
}

export default GameContent;