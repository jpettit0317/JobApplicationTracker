import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { NavBar } from "../navbar/NavBar"
import { useState } from "react";
import Button from "react-bootstrap/Button";
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
    );
}