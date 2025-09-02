import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { LogoutButton } from "./AuthComponent.jsx";
import AuthContext from "../contexts/authContext";

function Home(props) {
    const {loggedIn, user} = useContext(AuthContext);

    const welcomeMessage = loggedIn ? `Welcome, ${user.username}!` : 'Welcome!';
    const coinsMessage = loggedIn ? `You have ${user.coins} coins.` : 'You are not logged in.'
    
    const playBtn = loggedIn ? 
        <Button className="btn-lg me-2" as={Link} variant="success" disabled={user.coins == 0} to={`/users/${user.id}/game`}>Play now</Button>
        : <Button className="btn-lg me-2 " as={Link} variant="success" to={`/free/game`}>Play now (easy mode)</Button>

    const logBtn = loggedIn ?
        <LogoutButton /> :
        <Button className="btn-lg" as={Link} variant="warning" to="/login">Log in</Button>

    return(
        <>
        <Row><Col><h1 className="fw-bold">{welcomeMessage}</h1></Col></Row>
        <Row className="lead"><Col><p>{coinsMessage}</p></Col></Row>
        <Row><Col><p>{playBtn}{logBtn}</p></Col></Row>
        </>
    )
}

export default Home;