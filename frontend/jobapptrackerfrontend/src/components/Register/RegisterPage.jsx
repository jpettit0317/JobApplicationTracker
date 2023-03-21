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

    const onEmailChange = (e) => {
        setEmailFieldInErrorState(false);
        setEmail(e.target.value);
        setEmailHelperText("");
    }

    const onPasswordChange = (e) => {
        setPasswordFieldInErrorState(false);
        setPassword(e.target.value);
        setPasswordHelperText("");
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPasswordInErrorState(false);
        setConfirmPassword(e.target.value);
        setConfirmPasswordHelperText("");
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

        if (isThereEmailError(emailError)) {
            setEmailFieldInErrorState(true);
            setEmailHelperText(emailError);
        }

        if (isTherePasswordError(passwordError)) {
            setPasswordFieldInErrorState(true);
            setPasswordHelperText(passwordError);
        }

        if (isThereConfirmPasswordError(confirmPasswordError)) {
            setConfirmPasswordInErrorState(true);
            setConfirmPasswordHelperText(confirmPasswordError);
        }
    }

    const areThereErrors = (errors) => {
        return errors.getEmailError() !== "" ||
        errors.getPasswordError() !== "" ||
        errors.getConfirmPasswordError() !== "";
    }

    const isThereEmailError = (emailError) => {
        return emailError !== "";
    }

    const isTherePasswordError = (passwordError) => {
        return passwordError !== "";
    }

    const isThereConfirmPasswordError = (confirmPasswordError) => {
        return confirmPasswordError !== "";
    }    

    return (
        <div>
            <NavBar showSearchBar="false"/>
            <Container className="loginformcontainer">
                <Form className="Auth-form">
                    <h4 data-testid="registerHeader">{header}</h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid="floatingEmailAddress"
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Email"
                        onChange={onEmailChange}
                        required
                        isInvalid={emailFieldInErrorState}
                        style={ {color: "black"} }
                        data-testid="emailAddress"
                        />
                        { emailFieldInErrorState &&
                           <Form.Text id="emailHelpBlock" 
                           style={ {color: "red"}}
                           data-testid="emailAddressHelperText"
                           >
                            {emailHelperText}
                           </Form.Text>
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Password*"
                    className="mb-3"
                    data-testid="floatingPassword"
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        required
                        isInvalid={passwordFieldInErrorState}
                        style={ {color : "black"} }
                        data-testid="password"
                        />
                        { passwordFieldInErrorState &&
                           <Form.Text id="passwordHelpBlock" 
                           style={ {color: "red"} }
                           data-testid="passwordHelperText"
                           >
                           {passwordHelperText}
                           </Form.Text>
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm Password*"
                    className="mb-3"
                    data-testid="floatingConfirmPassword"
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onConfirmPasswordChange}
                        required
                        isInvalid={confirmPasswordInErrorState}
                        style={ {color : "black"} }
                        data-testid="confirmPassword"
                        />
                        { confirmPasswordInErrorState &&
                           <Form.Text 
                           id="passwordHelpBlock" 
                           style={ {color: "red"} }
                           data-testid="confirmPasswordHelperText"
                           >
                           {confirmPasswordHelperText}
                           </Form.Text>
                        }
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Nav>
                                <Nav.Link href="Login"
                                data-testid="loginLink"
                                >
                                    {loginLink}
                                </Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={onSubmitPressed}
                        data-testid="submit"
                        >
                            Submit
                        </Button>
                    </Row>
                </Form>
                
            </Container>
        </div>
    );
}