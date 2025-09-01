import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import AuthContext from "../contexts/authContext";

function Home() {
    const {loggedIn, user} = useContext(AuthContext);

    return(
        <>
        <Row><Col><h1>{loggedIn? `Welcome, ${user.username}!` : 'Welcome!'}</h1></Col></Row>
        <Row><Col>{loggedIn? `You have ${user.coins} coins.` : 'You are not logged in.'}</Col></Row>
        <Row><Col>
            {loggedIn && <Button as={Link} disabled={user.coins == 0} to={`/users/${user.id}/game`}>Play now</Button>}
            {!loggedIn && <Button as={Link} variant="success" to={`/free/game`}>Play now (easy mode)</Button>} or 
            {!loggedIn && <Button as={Link} variant="warning" to="/login">Log in</Button>}
            </Col></Row>
        </>
    )
}

export default Home;