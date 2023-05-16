import React from "react";

import { Container, FloatingLabel, Form, Nav, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import './LoginPage.css';
import { Login } from "../../model/interfaces/login/Login";
import { LoginErrors } from "../../model/interfaces/login/LoginErrors";
import { Link } from "react-router-dom";
import { NavBar } from "../navbar/NavBar";
import { getLoginErrors } from "../../functions/getLoginErrors";
import { LoginFormIds } from "./constants/LoginFormIds";
import { navBarTitle } from "../../constants/NavBarTitle";

export const LoginPage = () => {
    const [login, setLogin] = useState<Login>({
        email: "",
        password: ""
    }); 
    const [loginErrors, setLoginErrors] = useState<LoginErrors>({
        emailError: "",
        isEmailInErrorState: false,
        passwordError: "",
        isPasswordInErrorState: false
    });

    const onEmailChange = (event: any) => {
        setLogin({
            ...login,
            email: event.target.value
        });
        setLoginErrors({
            ...loginErrors,
            isEmailInErrorState: false,
            emailError: ""
        });
    }
    
    const onPasswordChange = (event: any) => {
        setLogin({
            ...login,
            password: event.target.value
        });
        setLoginErrors({
            ...loginErrors,
            isPasswordInErrorState: false,
            passwordError: ""
        });
    }

    const onSubmitPressed = () => {
        const errors = getLoginErrors(login);

        if (isThereErrors(errors)) {
            setErrors(errors);
            return;            
        }
    }

    const setErrors = (errors: LoginErrors) => {
        if (isThereAEmailError(errors)) {
            setLoginErrors({
                ...loginErrors,
                emailError: errors.emailError,
                isEmailInErrorState: true
            });
        }

        if (isThereAPasswordError(errors)) {
            setLoginErrors({
                ...loginErrors,
                passwordError: errors.passwordError,
                isPasswordInErrorState: true
            }); 
        }
    }

    const isThereErrors = (errors: LoginErrors) => {
        return errors.passwordError !== "" 
        || errors.emailError !== "";
    }

    const isThereAEmailError = (errors: LoginErrors) => {
        return errors.emailError !== "";
    }

    const isThereAPasswordError = (errors: LoginErrors) => {
        return errors.passwordError !== "";
    }

    const header = "Login";
    const signUpLink = "Don't have an account? Sign up!";
    
    return (
        <div>
            <NavBar title={navBarTitle}/>
            <Container className="loginformcontainer">
                <Form className="Auth-form">
                    <h4 data-testid={LoginFormIds.loginHeader}>{header}</h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={LoginFormIds.floatingEmail}
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Email"
                        onChange={onEmailChange}
                        required
                        isInvalid={loginErrors.isEmailInErrorState}
                        style={ {color: "black"} }
                        data-testid={LoginFormIds.emailField}
                        />
                        { loginErrors.isEmailInErrorState &&
                           <Form.Text 
                           id="emailHelpBlock" 
                           style={ {color: "red"}}
                           data-testid={LoginFormIds.emailHelper}
                           >
                               {loginErrors.emailError}
                           </Form.Text>  
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Password*"
                    className="mb-3"
                    data-testid={LoginFormIds.floatingPassword}
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        required
                        isInvalid={loginErrors.isPasswordInErrorState}
                        style={ {color : "black"} }
                        data-testid={LoginFormIds.passwordField}
                        />
                        { loginErrors.isPasswordInErrorState &&
                           <Form.Text id="passwordHelpBlock" 
                           style={ {color: "red"} }
                           data-testid={LoginFormIds.passwordHelper}>
                               {loginErrors.passwordError}
                           </Form.Text>
                        }
                    </FloatingLabel>
                    <Row style={{padding: "10px"}}>
                        <Col>
                            <Nav data-testid={LoginFormIds.signUpLink}>
                                <Link to="/register">{signUpLink}</Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={onSubmitPressed}
                         data-testid={LoginFormIds.submit}>
                            Submit
                        </Button>
                    </Row>
                </Form>
                
            </Container>
        </div>
    )
}