import { useActionState, useContext } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import GameContext from "../contexts/gameContext";

function AnswerForm() {
    const { gameInfo, guessPhrase } = useContext(GameContext);

    const [state, formAction, isPending] = useActionState();

    const guessPhraseFunction = (prevState, formData) => {
        const phraseObj = {
            phrase: formData.get('phrase')
        };

        try {
            guessPhrase(gameInfo.game.gameId, phrase);
        } catch (error) {
            
        }
    }

    return(
        <Form action={formAction}>
            <FormGroup className="mb-3" controlId="answerTextArea">
                <FormLabel>Write your answer here</FormLabel>
                <FormControl name="phrase" as="textarea" rows={3} />
            </FormGroup>
            <Button variant="success" className="me-3">Go!</Button>
            <Button variant="danger" type="cancel">Cancel</Button>
        </Form>
    )
}

export default AnswerForm;