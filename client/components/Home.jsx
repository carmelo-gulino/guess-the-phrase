import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { LogoutButton } from "./AuthComponent.jsx";
import AuthContext from "../contexts/authContext";

function Home() {
    const {loggedIn, user} = useContext(AuthContext);

    const location = useLocation();
    const gameInfo = location?.state || {status: null};

    let welcomeMessage = loggedIn ? `Welcome, ${user.username}!` : 'Welcome!';;
    let coinsMessage = loggedIn ? `You have ${user.coins} coins.` : 'You are not logged in.';

    if (gameInfo.status === 'won') {
        welcomeMessage =  "Congratulations!";
        coinsMessage = loggedIn ? `You won 100 coins, now you have ${user.coins} coins.` : "You can play again or log in and play with coins";
    } else if (gameInfo.status === 'timeout') {
        welcomeMessage =  "You lost!";
        coinsMessage = loggedIn ? "You lost 20 coins, try again!" : "You can play again or log in and play with coins";
    } else if (gameInfo.status === 'ended') {
        welcomeMessage =  "You left!";
        coinsMessage = loggedIn ? "You didn't lose any coins, try again!" : "You can play again or log in and play with coins";
    }
    
    const playBtn = loggedIn ? 
        <Button className="btn-lg me-2" as={Link} variant="success" disabled={user.coins === 0} to={`/users/${user.id}/game`}>Play now</Button>
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