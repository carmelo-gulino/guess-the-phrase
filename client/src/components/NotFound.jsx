import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router";

function NotFound() {
  return(
    <Row>
      <Col className="text-center">
        <h1>Whoops!</h1>
        <p className="lead">Something went wrong...</p>
        <p><Button as={Link} to={"/"}>Go back home</Button> </p>
    </Col>
    </Row>
  );
}

export default NotFound;