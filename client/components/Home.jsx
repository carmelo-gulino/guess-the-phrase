import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { LogoutButton } from "./AuthComponent.jsx";
import AuthContext from "../contexts/authContext";

function Home() {
    const {loggedIn, user} = useContext(AuthContext);

    const location = useLocation();
    const  {status, correctPhrase} = location?.state || {};

    let welcomeMessage;
    let coinsMessage; 

    switch (status) {
        case 'won':
            welcomeMessage =  "Congratulations!";
            coinsMessage = loggedIn ? `You won 100 coins, now you have ${user.coins} coins` : "You won! Play again or log in and play with coins";
            break;
        case 'timeout':
            welcomeMessage =  "You lost!";
            coinsMessage = loggedIn ? `You lost 20 coins, now you have ${user.coins} coins` : "You can play again or log in and play with coins";
            break;
        case 'ended':
            welcomeMessage =  "You left!";
            coinsMessage = loggedIn ? `You didn't lose any coins, you have ${user.coins} coins` : "You can play again or log in and play with coins";
            break;
        default:
            welcomeMessage =  loggedIn ? `Welcome ${user.username}!` : "Welcome!";
            coinsMessage = loggedIn ? 
            user.coins > 0 ? `You have ${user.coins} coins.` : `You have ${user.coins} coins: you must logout to play`
            : `Play now or log in.`
            break;
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
        {status && <Row className="lead"><Col>The phrase was: "{<span><strong>{correctPhrase}</strong></span>}"</Col></Row>}
        <Row className="lead"><Col>{coinsMessage}</Col></Row>
        <Row className="mt-3"><Col>{playBtn}{logBtn}</Col></Row>
        </>
    )
}

export default Home;