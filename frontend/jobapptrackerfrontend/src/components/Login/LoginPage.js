import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { NavBar } from "../navbar/NavBar"
import { useState } from "react";
import Button from "react-bootstrap/Button";
import './LoginPage.css';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHelperText, setPasswordHelperText] = useState("");
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
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitPressed = () => {
        console.log('Email is ', email);
        console.log('Password is', password);
    }

    const header = "Login";
    const signUpLink = "Don't have an account? Sign up!";
    const forgotPasswordLink = "Reset your password";
    const passwordError = "Your password must be 8-20 characters long, contain letters and numbers, " +
    "and must not contain spaces, special characters, or emoji.";

    return (
        <div>
            <NavBar onSearchButtonPressed={onSearchButtonPressed}/>
            <Container className="loginformcontainer">
                <Form className="Auth-form">
                    <h4>{header}</h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address *"
                    className="mb-3"
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Email"
                        onChange={onEmailChange}
                        required
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            {passwordHelperText}
                        </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Password *"
                    className="mb-3"
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        required
                        />
                    </FloatingLabel>
                </Form>
                <Row>
                        <Col>
                            <Nav>
                                <Nav.Link href="Signup">
                                    {signUpLink}
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col>
                            <Nav>
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
            </Container>
        </div>
    )
}