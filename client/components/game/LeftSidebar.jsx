import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import GameContext from "../../contexts/gameContext";

function LeftSidebar(props) {
    const { gameInfo } = useContext(GameContext);
    <i className="bi bi-stopwatch-fill fs-1"></i>
    return(
        <Row>
            <Col className="d-flex flex-column justify-content-center align-items-center">
                {gameInfo.status === 'playing' ? 
                        <><i className="bi bi-stopwatch-fill fs-1"></i>
                        <strong className={props.timer < 11 ? 'fs-1 text-danger' : 'fs-1'}>{props.timer}</strong></>
                        : props.icon}
            </Col>
        </Row>
    )
}

export default LeftSidebar;