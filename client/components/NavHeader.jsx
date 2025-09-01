import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import { Container, Navbar, NavbarBrand, Row } from "react-bootstrap";
import AuthContext from "../contexts/authContext";
import { LogoutButton } from "./AuthComponent";

function NavHeader(props) {
    const {loggedIn} = useContext(AuthContext);

    return(
        <Navbar expand="lg" bg="info">
            <Container fluid className="align-items-center justify-content-between">
                <img src="../img/qmark4.png" height="80" alt="qmark" ></img>
                <NavbarBrand><h1>Guess the phrase</h1></NavbarBrand>
                {loggedIn? <LogoutButton handleLogout={props.handleLogout}/> : <img src="../img/qmark4.png" height="80" alt="qmark" ></img>}
            </Container>
        </Navbar>
    )
}

export default NavHeader;