import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { NavBar } from "../navbar/NavBar"
import { useState } from "react";
import Button from "react-bootstrap/Button";
import './LoginPage.css';
import { Login } from "../../models/Login";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [emailHelperText, setEmailHelperText] = useState("");
    const [passwordFieldInErrorState, setPasswordFieldInErrorState] = useState(false);
    const [emailFieldInErrorState, setEmailFieldInErrorState] = useState(false);
    /*
    Return type is void
    searchTerm is a string

    This method searches for a term.
    */
    const onSearchButtonPressed = (searchTerm) => {
        console.log('The search term is', searchTerm);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailHelperText("");
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordHelperText("");
    }

    const onSubmitPressed = () => {
        const login = new Login(email, password);
        const errors = login.getErrors();

        if (isThereErrors(errors)) {
            setErrors(errors);
            console.log('Setting errors');
            return;            
        }
    }

    const setErrors = (errors) => {
        setEmailHelperText(errors.getEmailError());
        setPasswordHelperText(errors.getPasswordError());

        if (isThereAEmailError()) {
            setEmailFieldInErrorState(true);
        }

        if (isThereAPasswordError()) {
            setPasswordHelperText(true);
        }
    }

    const isThereErrors = (errors) => {
        return errors.getPasswordError() !== "" || errors.getEmailError() !== "";
    }

    const isThereAEmailError = () => {
        return emailHelperText !== "";
    }

    const isThereAPasswordError = () => {
        return passwordHelperText !== "";
    }

    const getTextColorForEmail = () => {
        if (isThereAEmailError()) {
            return "red";
        } else {
            return "black";
        }
    }

    const getTextColorForPassword = () => {
        if (isThereAPasswordError()){
            return "red";
        } else {
            return "black";
        }
    }

    const header = "Login";
    const signUpLink = "Don't have an account? Sign up!";
    const forgotPasswordLink = "Reset your password";
    
    return (
        <div>
            <NavBar onSearchButtonPressed={onSearchButtonPressed}/>
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
                    <Row>
                        <Col>
                            <Nav>
                                <Nav.Link href="Signup">
                                    {signUpLink}
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav style={{justifyContent: "right"}}>
                                <Nav.Link href="Reset Password">
                                    {forgotPasswordLink}
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
    )
}