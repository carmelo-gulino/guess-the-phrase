function ConsonantsList(props) {

    const consonants = [
        ['Z', 'Q', 'X', 'J', 'K'],
        ['V', 'B', 'P', 'G'],
        ['F', 'Y', 'W', 'M', 'C'],
        ['R', 'L', 'D', 'H', 'S'],
        ['T', 'N']
    ];

    return(
        <>
        {consonants.map((arr, index) => (
            <Row key={`consonantsRow - ${index}`} className="mt-2">
                <Col>
                    <LetterActions cost={index+1} letters={arr} type={'c'} setCurrentView={props.setCurrentView}/>
                </Col>
            </Row>
        ))}
        </>
    )
}

function VowelsList(props) {

    const vowels = ['A', 'E', 'I', 'O', 'U'];
    
    return(
        <Row>
            <Col>
                <div className="d-flex">
                    <LetterActions cost={10} letters={vowels} type={'v'} setCurrentView={props.setCurrentView} setVowelPresent={props.setVowelPresent}/>
                </div>
            </Col>
        </Row>
    )
}

function LetterActions(props) {
    const { gameInfo, guessLetter } = useContext(GameContext);

    const onClickLetter = (gameId, letter, cost, type) => {
        guessLetter(gameId, letter, cost);
        props.setCurrentView('none');
        type === 'v' && props.setVowelPresent(true);
    }

    return(
        <>
        <div className="d-flex">
            <span className="me-2"><i className="bi bi-coin text-warning fs-3"></i> <strong className="fs-5">{props.cost}</strong></span>
            {props.letters.map(l => (
              <Button className="me-1" variant="outline-dark" key={ props.type === 'c' ? `consonantsButton-${l}` : `vowelsButton-${l}`} 
                disabled={gameInfo.game.guessedLetters.includes(l)}
                onClick={() => onClickLetter(gameInfo.game.gameId, l, props.cost, props.type)}>{l}</Button>
            ))}
        </div>
        </>
    )
}

export {ConsonantsList, VowelsList};