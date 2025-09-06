import { useContext } from "react";
import { Table } from "react-bootstrap";
import GameContext from "../../contexts/gameContext";

function GameGrid() {

    return (
        <Table bordered>
            <tbody>
                {Array.from({length:5}).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({length: 10}).map((_, colIndex) => (
                            <CellContent key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex}/>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

function CellContent(props) {
    const {gameInfo} = useContext(GameContext);

    const index = props.rowIndex*10+props.colIndex;
    const isBlank = gameInfo?.game?.blanks?.includes(index);

    let text;
    if (isBlank) {
        text = ' ';
    } else if (gameInfo?.game?.revealed?.[index]) {
        text = gameInfo?.game?.revealed?.[index];
    } else {
        text = '';
    }

    let cellClass = 'text-center align-middle fs-4';
    if (isBlank || index >= gameInfo?.game?.length) {
        cellClass = 'text-center align-middle fs-4 bg-secondary';
    }

    return(
        <td className={cellClass}>{text}</td>        
    )
}

export default GameGrid;