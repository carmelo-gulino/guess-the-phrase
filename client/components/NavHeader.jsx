import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { Button, Container, Navbar, NavbarBrand, Row } from "react-bootstrap";
import AuthContext from "../contexts/authContext";
import { useNavigate } from "react-router";

function NavHeader(props) {
    const {loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    return(
        <Navbar expand="lg" bg="info">
            <Container fluid className="align-items-center justify-content-between">
                <i className="bi bi-patch-question-fill"></i>
                <NavbarBrand><h1>Guess the phrase</h1></NavbarBrand>
                {loggedIn && <i className="bi bi-person-circle"></i>}
                {loggedIn && <Button onClick={() => {props.handleLogout(); navigate('/');}} variant="warning">Logout</Button>}
            </Container>
        </Navbar>
    )
}

export default NavHeader;