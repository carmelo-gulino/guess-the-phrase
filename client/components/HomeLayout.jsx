import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";

function HomeLayout() {
    return(
        <>
        <Row className="justify-content-between">
            <Col className="align-items-center"><img src="../img/qmark2.png" alt="qmark" ></img></Col>
            <Col><Outlet/></Col>
        </Row>
        </>
    )
}

export default HomeLayout;