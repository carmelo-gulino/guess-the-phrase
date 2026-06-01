import { Col, Container, Row } from "react-bootstrap";
import NavHeader from "./NavHeader";
import { Outlet } from "react-router";
import { useContext } from "react";
import GameContext from "../contexts/gameContext";
import LeftSidebar from "./game/LeftSidebar";
import RightSidebar from "./game/RightSidebar";

function DefaultLayout(props) {
    const { gameInfo } = useContext(GameContext);
    const icon = <i className="bi bi-question-circle text-info" style={{fontSize: "15rem"}}/>;

    return(
        <>
        <NavHeader handleLogout={props.handleLogout}/>
        <Container fluid className="mt-4">
            <Row className="d-flex align-items-center text-center">
                <Col lg="3" className="d-flex justify-content-center align-items-center">
                    {gameInfo.status === 'playing' ? <LeftSidebar timer={props.timer} icon={icon}/> : icon}
                </Col>
                <Col lg="6">
                    <Outlet/>
                </Col>
                <Col lg="3" className="d-flex justify-content-center align-items-center">
                    <RightSidebar icon={icon}/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default DefaultLayout;