import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";

function HomeLayout() {
    return(
        <Container fluid>
            <Row>
                <Col><i className="bi bi-patch-question-fill"></i></Col>
                <Col><Outlet/></Col>
            </Row>
        </Container>
    )
}

export default HomeLayout;