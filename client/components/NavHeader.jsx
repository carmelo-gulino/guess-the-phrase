import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Navbar } from "react-bootstrap";

function HeaderIcon() {
    return(
        <i className="bi bi-question-circle-fill text-danger fs-2"/>
    )
}

function NavHeader() {

    return(
        <Navbar expand="lg" bg="info">
            <Container fluid className="align-items-center justify-content-between">
                <HeaderIcon/>
                <h1 className="fw-bold display-4 text-center">Guess the phrase</h1>
                <HeaderIcon/>
            </Container>
        </Navbar>
    )
}

export default NavHeader;