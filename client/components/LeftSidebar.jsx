import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import GameContext from "../contexts/gameContext.js";

function Timer() {
    const {gameInfo} = useContext(GameContext);

    return (
        <>{gameInfo?.game?.timer}:00</>
    )
}

function LeftSidebar() {
    
    return(
        <>
        <Row className="align-items-center">
            <Col className="text-center"><strong><Timer/></strong></Col>
        </Row>
        </>
    )
}

export default LeftSidebar;