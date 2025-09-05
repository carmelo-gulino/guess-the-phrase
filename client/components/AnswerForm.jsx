import { useActionState, useContext } from "react";
import { Alert, Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import GameContext from "../contexts/gameContext";

function AnswerForm(props) {
    const { gameInfo, guessPhrase } = useContext(GameContext);

    const guessPhraseFunction = async (prevState, formData) => {
        const phrase = Object.fromEntries(formData.entries());
        
        if (phrase.phrase.trim() === '') {
            return {error: "The phrase can't be empty"};
        }

        try {
            await guessPhrase(gameInfo.game.gameId, phrase);
            props.setCurrentView('none');
            return phrase;
        } catch (serverError) {
            return {error: serverError};
        }
    }

    const [state, formAction, isPending] = useActionState(guessPhraseFunction, {error: null});

    return(
        <>
        {isPending && <Alert dismissible variant="warning">We are checking your phrase...</Alert>}
        {state.error && <p className="text-danger">{state.error}</p>}
        <Form action={formAction}>
            <FormGroup className="mb-3" controlId="answerTextArea">
                <FormLabel>Write your answer here</FormLabel>
                <FormControl name="phrase" type="text" required as="textarea" rows={3} />
            </FormGroup>
            <Button variant="success" type="submit" className="me-3">Go!</Button>
            <Button variant="danger" type="cancel">Cancel</Button>
        </Form>
        </>
    )
}

export default AnswerForm;