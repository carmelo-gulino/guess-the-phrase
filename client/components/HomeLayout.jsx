import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router";

function HomeLayout() {
    return(
        <>
        <Row className="align-items-center">
            <Col className="d-flex justify-content-center align-items-center"><i className="bi bi-question-circle text-info" style={{fontSize: "15rem"}}/></Col>
            <Col><Outlet/></Col>
        </Row>
        </>
    )
}

export default HomeLayout;