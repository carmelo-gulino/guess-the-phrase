import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row } from "react-bootstrap";

function Timer() {
    return (
        <h2>30:00</h2>
    )
}
function LeftSidebar() {
    return(
        <>
        <Row className="align-items-center">
            <Col className="text-center"><Timer/></Col>
        </Row>
        </>
    )
}

export default LeftSidebar;