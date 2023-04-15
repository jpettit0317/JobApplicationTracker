import { Form } from "react-bootstrap";
import { FormControlFeedbackProps } from "./FormControlFeedbackProps";

export const FormControlFeedback = (props: FormControlFeedbackProps) => {
    return (
        <Form.Control.Feedback type={props.type}>
            {props.text}
        </Form.Control.Feedback>
    );
}