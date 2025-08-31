import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

function AnswerForm(props) {
    return(
        <Form>
            <FormGroup className="mb-3" controlId="answerTextArea">
                <FormLabel>Write your answer here</FormLabel>
                <FormControl as="textarea" rows={3} />
            </FormGroup>
            <Button variant="success" className="me-3">Go!</Button>
            <Button variant="secondary" className="me-3" onClick={() => props.setCurrentView('none')}>Go back</Button>
            <Button variant="danger" type="cancel">Cancel</Button>
        </Form>
    )
}

export default AnswerForm;