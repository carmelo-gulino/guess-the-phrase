import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AuthContext from "../contexts/authContext";

function RightSidebar() {
    const {loggedIn, user} = useContext(AuthContext);

    return(
        <>
        <Row className="align-items-center">
            <Col><img height="100" src="../img/coin.png"/></Col>
        </Row>
        <Row className="align-items-center">
            <Col>{loggedIn ? `${user.coins} coins` : 'You are playing in easy mode'}</Col>
        </Row>
        </>
    )
}

export default RightSidebar;