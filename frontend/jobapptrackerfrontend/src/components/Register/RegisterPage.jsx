import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { NavBar } from "../navbar/NavBar"
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Register, RegisterErrors } from "../../models/SignUp/Register";
import './RegisterPage.css';


export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState("");
    const [emailHelperText, setEmailHelperText] = useState("");
    const [passwordFieldInErrorState, setPasswordFieldInErrorState] = useState(false);
    const [emailFieldInErrorState, setEmailFieldInErrorState] = useState(false);
    const [confirmPasswordInErrorState, setConfirmPasswordInErrorState] = useState(false);

    const header = "Sign Up";
    const loginLink = "Have an account? Login.";

    const getTextColorForEmail = () => {
        if (emailFieldInErrorState) {
            return "red";
        }
        return "black";
    }

    const getTextColorForPassword = () => {
        if (passwordFieldInErrorState) {
            return "red";
        }
        return "black";
    }

    const getTextColorForConfirmPassword = () => {
        if (confirmPasswordInErrorState) {
            return "red";
        }
        return "black";
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailHelperText("");
        setEmailFieldInErrorState(false);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordHelperText("");
        setPasswordFieldInErrorState(false);
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordHelperText("");
        setConfirmPasswordInErrorState(false);
    }

    const onSubmitPressed = () => {
        const register = new Register(email, password,
            confirmPassword);
        
        const errors = register.getErrors();

        if(areThereErrors(errors)) {
            setErrors(errors);
            return;
        }
    }

    const setErrors = (errors) => {
        const emailError = errors.getEmailError();
        const passwordError = errors.getPasswordError();
        const confirmPasswordError = errors.getConfirmPasswordError();

        if (emailError !== "") {
            setEmailHelperText(emailError);
            setEmailFieldInErrorState(true);
        }

        if (passwordError !== "") {
            setPasswordHelperText(passwordError);
            setPasswordFieldInErrorState(true);
        }

        if (confirmPasswordError !== "") {
            setConfirmPasswordHelperText(confirmPasswordError);
            setConfirmPasswordInErrorState(true);
        }
    }

    const areThereErrors = (errors) => {
        return errors.getEmailError() !== "" ||
        errors.getPasswordError() !== "" ||
        errors.getConfirmPasswordError() !== "";
    }

    return (
        <div>
            <NavBar showSearchBar="false"/>
            <Container className="loginformcontainer">
                <Form className="Auth-form">
                    <h4>{header}</h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address*"
                    className="mb-3"
                    style={ {color: getTextColorForEmail()} }
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Email"
                        onChange={onEmailChange}
                        required
                        isInvalid={emailFieldInErrorState}
                        style={ {color: getTextColorForEmail()} }
                        />
                        <Form.Text id="emailHelpBlock" style={ {color: getTextColorForEmail()}}>
                            {emailHelperText}
                        </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Password*"
                    className="mb-3"
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        required
                        isInvalid={passwordFieldInErrorState}
                        style={ {color : getTextColorForPassword()} }
                        />
                        <Form.Text id="passwordHelpBlock" style={ {color: getTextColorForPassword()} }>
                            {passwordHelperText}
                        </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm Password*"
                    className="mb-3"
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onConfirmPasswordChange}
                        required
                        isInvalid={confirmPasswordInErrorState}
                        style={ {color : getTextColorForConfirmPassword()} }
                        />
                        <Form.Text id="passwordHelpBlock" style={ {color: getTextColorForConfirmPassword()} }>
                            {confirmPasswordHelperText}
                        </Form.Text>
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Nav>
                                <Nav.Link href="Login">
                                    {loginLink}
                                </Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={onSubmitPressed}>
                            Submit
                        </Button>
                    </Row>
                </Form>
                
            </Container>
        </div>
    );
}