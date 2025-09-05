import { useActionState, useContext } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import AuthContext from "../contexts/authContext";

function LoginForm() {

    const [state, formAction, isPending] = useActionState(loginFunction, {username: '', password: ''});
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    async function loginFunction(prevState, formData) {
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        if (credentials.username.trim() === '' || credentials.password.trim() === '') {
            return {error: "The fields can't be empty."}
        }
        
        try {
            const user = await handleLogin(credentials);
            navigate(`/users/${user.id}`);
        } catch (error) {
            return { error: 'Wrong username or password.' };
        }
    }

    return(
        <>
        { isPending && <Alert variant="warning">Please, wait for the server's response...</Alert> }
        <Row className="align-items-center"><Col><h1 className="fw-bold">Log in</h1></Col></Row>
        <Form action={formAction}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><strong>Username</strong></Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter your username" required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter your password" required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3 align-items-center">
                <Col>
                    {state.error && <p className="text-danger">{state.error}</p>}
                    <Button className="me-3" variant="success" type="submit">Log in</Button>
                    <Button as={Link} to="/" variant="secondary" className="me-3">Go back</Button>
                    <Button variant="danger" type="reset" >Delete</Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}

function LogoutButton(props) {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);

    return(
        <Button onClick={() => {handleLogout(); navigate('/');}} className="btn-lg" variant="warning">Logout</Button>
    )
}

export { LoginForm, LogoutButton };