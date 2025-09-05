import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

function HeaderIcon() {
    return(
        <i className="bi bi-patch-question-fill text-danger fs-2"></i>
    )
}

function NavHeader() {

    return(
        <Navbar expand="lg" bg="info">
            <Container fluid className="align-items-center justify-content-between">
                <HeaderIcon/>
                <NavbarBrand><h1 className="fw-bold display-4 text-center">Guess the phrase</h1></NavbarBrand>
                <HeaderIcon/>
            </Container>
        </Navbar>
    )
}

export default NavHeader;