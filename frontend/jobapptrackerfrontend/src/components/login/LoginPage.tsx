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
import { LoginAlert } from "../alerts/LoginAlert";
import { loginUser } from "../../functions/networkcalls/loginUser";
import { APIEndPoint } from "../../enums/APIEndPoint_enum";
import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { LoadingIndicator } from "../loadingindicator/LoadingIndicator";
import { RoutePath } from "../../enums/RoutePath_enum";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

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
            setLoginErrors(errors); 
            return;            
        }

        loginUserToBackend();
    }

    const onAlertCloseButtonPressed = () => {
        setIsAlertShowing(false);
    }

    const loginUserToBackend = async () => {
        setIsLoading(true);

        loginUser(login, APIEndPoint.loginUser).then(
            (response: (HttpResponse<string> | undefined)) => {
                handleLoginUser(response);
            })
            .catch((reason: string) => {
                handleUnexpectedError(reason); 
        });
    }

    const handleLoginUser = (resp: (HttpResponse<string> | undefined)) => {
        setIsLoading(false);
        
        if (resp !== undefined && !resp.isError()) {
            handleSuccess(resp);
        } else if (resp === undefined) {
            handleUndefined();
        } else {
            handleError(resp);
        }
    }

    const handleError = (resp: HttpResponse<string>) => {
        setAlertMessage(resp.errorMessage);
        setIsAlertShowing(true);
    }

    const handleUndefined = () => {
        setAlertMessage("Something went wrong!!");
        setIsAlertShowing(true);
    };

    const handleSuccess = (resp: HttpResponse<string>) => {
        console.log("Successful response is ")
        console.log(JSON.stringify(resp));
    };

    const handleUnexpectedError = (reason: string) => {
        setIsLoading(false);
        setAlertMessage(reason);
        setIsAlertShowing(true);
    };

    const isThereErrors = (errors: LoginErrors) => {
        return isThereAEmailError(errors) 
        || isThereAPasswordError(errors);
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
            { isAlertShowing &&
                <LoginAlert 
                    alertMessage={alertMessage}
                    alertTitle="Error"
                    shouldShow={isAlertShowing}
                    closeButtonPressed={onAlertCloseButtonPressed}
                />
            }
            <NavBar title={navBarTitle}/>
            <Container className="loginformcontainer">
                { isLoading &&
                    <LoadingIndicator 
                        isLoading={isLoading}
                        size={30}
                        ariaLabel="Loading"
                        testId={LoginFormIds.loadingIndicator}
                    />
                }
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
                                <Link to={RoutePath.signup}>{signUpLink}</Link>
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