import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AuthContext from "../../contexts/authContext";

function RightSidebar() {
    const {loggedIn, user} = useContext(AuthContext);

    return(
        <>
        <Row className="align-items-center">
            <Col className='text-center'><i className="bi bi-coin text-warning fs-1"/></Col>
        </Row>
        <Row className="align-items-center">
            <Col className='text-center'>{loggedIn ? `${user.coins} coins` : 'You are playing in easy mode'}</Col>
        </Row>
        </>
    )
}

export default RightSidebar;