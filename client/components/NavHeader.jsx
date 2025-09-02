import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

function NavHeader() {

    return(
        <Navbar expand="lg" bg="info">
            <Container fluid className="align-items-center justify-content-between">
                <img src="../img/qmark4.png" height="80" alt="qmark" ></img>
                <NavbarBrand><h1 className="fw-bold display-4 text-center">Guess the phrase</h1></NavbarBrand>
                <img src="../img/qmark4.png" height="80" alt="qmark" ></img>
            </Container>
        </Navbar>
    )
}

export default NavHeader;