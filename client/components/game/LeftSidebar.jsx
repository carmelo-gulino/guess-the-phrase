import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Row } from "react-bootstrap";

function LeftSidebar(props) {
    
    return(
        <>
        <Row className="align-items-center">
            <Col className="text-center"><i className="bi bi-stopwatch-fill fs-1"></i></Col>
        </Row>
        <Row className="align-items-center">
            <Col className="text-center"><h2>{props.timer}</h2></Col>
        </Row>
        </>
    )
}

export default LeftSidebar;