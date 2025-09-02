import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Row } from "react-bootstrap";

function LeftSidebar(props) {
    
    return(
        <>
        <Row className="align-items-center">
            <Col className="text-center"><strong>{props.timer}</strong></Col>
        </Row>
        </>
    )
}

export default LeftSidebar;