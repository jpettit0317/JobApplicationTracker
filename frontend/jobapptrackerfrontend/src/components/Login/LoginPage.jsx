import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { NavBar } from "../navbar/NavBar"
import { useState } from "react";
import Button from "react-bootstrap/Button";
import './LoginPage.css';
import { Login } from "../../models/Login/Login";
import { Link } from "react-router-dom";
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
        setEmailFieldInErrorState(false);
        setEmail(event.target.value);
        setEmailHelperText("");
    }
    
    const onPasswordChange = (event) => {
        setPasswordFieldInErrorState(false);
        setPassword(event.target.value);
        setPasswordHelperText("");
    }

    const onSubmitPressed = () => {
        const login = new Login(email, password);
        const errors = login.getErrors();

        console.log("Email error is ", errors.getEmailError());
        if (isThereErrors(errors)) {
            setErrors(errors);
            console.log('Setting errors');
            return;            
        }
    }

    const setErrors = (errors) => {
        if (isThereAEmailError(errors)) {
            console.log("Setting email error to ", errors.getEmailError());
            setEmailFieldInErrorState(true);
            setEmailHelperText(errors.getEmailError());
        }

        if (isThereAPasswordError(errors)) {
            console.log("Setting password error to ", errors.getPasswordError());
            setPasswordFieldInErrorState(true);
            setPasswordHelperText(errors.getPasswordError());
        }
    }

    const isThereErrors = (errors) => {
        return errors.getPasswordError() !== "" || errors.getEmailError() !== "";
    }

    const isThereAEmailError = (errors) => {
        return errors.getEmailError() !== "";
    }

    const isThereAPasswordError = (errors) => {
        return errors.getPasswordError() !== "";
    }

    const header = "Login";
    const signUpLink = "Don't have an account? Sign up!";
    const forgotPasswordLink = "Reset your password";
    
    return (
        <div>
            <NavBar />
            <Container className="loginformcontainer">
                <Form className="Auth-form">
                    <h4 data-testid="loginHeader">{header}</h4>
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
                        data-testid="emailField"
                        />
                        { emailFieldInErrorState &&
                           <Form.Text 
                           id="emailHelpBlock" 
                           style={ {color: "red"}}
                           data-testid="emailHelperText"
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
                        data-testid="passwordField"
                        />
                        { passwordFieldInErrorState &&
                           <Form.Text id="passwordHelpBlock" 
                           style={ {color: "red"} }
                           data-testid="passwordHelperText">
                               {passwordHelperText}
                           </Form.Text>
                        }
                    </FloatingLabel>
                    <Row style={{padding: "10px"}}>
                        <Col>
                            <Nav data-testid="signuplink">
                                <Link to="/register">{signUpLink}</Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={onSubmitPressed} data-testid="loginSubmit">
                            Submit
                        </Button>
                    </Row>
                </Form>
                
            </Container>
        </div>
    )
}