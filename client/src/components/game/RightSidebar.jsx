import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AuthContext from "../../contexts/authContext";
import GameContext from '../../contexts/gameContext';

function RightSidebar(props) {
    const {loggedIn, user} = useContext(AuthContext);
    const { gameInfo } = useContext(GameContext);

    return(
        <Row>
            <Col className="d-flex flex-column justify-content-center align-items-center">
                {gameInfo.status === 'playing' ? 
                    <><i className="bi bi-coin text-warning fs-1" />
                    <span>{loggedIn ? `${user.coins} coins` : 'You are playing in easy mode'}</span></> 
                    : props.icon}
            </Col>
        </Row>
    )
}

export default RightSidebar;