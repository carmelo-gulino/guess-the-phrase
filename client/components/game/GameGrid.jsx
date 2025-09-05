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

export default GameGrid;