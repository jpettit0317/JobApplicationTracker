import { useState } from "react"
import { navBarTitle } from "../../constants/NavBarTitle";
import { NavBar } from "../navbar/NavBar";
import './SignUpPage.css';
import { Button, Col, Container, FloatingLabel, Form, Nav, Row } from "react-bootstrap";
import { SignUpTestIds } from "./SignUpTestIds";
import { Link } from "react-router-dom";
import { SignUpConfirmPassword } from "../../model/interfaces/signup/SignUp";
import { SignUpErrors } from "../../model/interfaces/signup/SignUpErrors";
import { getSignUpErrors } from "../../functions/getSignUpErrors";
import { FormControlFeedback } from "../formcontrolhelper/FormControlFeedback";
import { LoadingIndicator } from "../loadingindicator/LoadingIndicator";

export const SignUpPage = () => {
    const [signUp, setSignUp] = useState<SignUpConfirmPassword>({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: ""
    });
    const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({
        emailError: "",
        firstnameError: "",
        lastnameError: "",
        passwordError: "",
        confirmPasswordError: "",
        isEmailInErrorState: false,
        isFirstnameInErrorState: false,
        isLastnameInErrorState: false,
        isPasswordInErrorState: false,
        isConfirmPasswordInErrorState: false       
    });
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [grayoutId, setGrayoutId] = useState<string>("");

    const grayoutCSSId = "grayout";
    const header = "Sign Up";
    const loginLink = "Already have an account? Log in!";

    const onEmailChange = (e: any) => {
        setSignUp({
            ...signUp,
            email: e.target.value
        });
        setSignUpErrors({
            ...signUpErrors,
            emailError: "",
            isEmailInErrorState: false
        });
    }

    const onFirstnameChange = (e: any) => {
        setSignUp({
            ...signUp,
            firstname: e.target.value
        });
        setSignUpErrors({
            ...signUpErrors,
            firstnameError: "",
            isFirstnameInErrorState: false
        });
    }

    const onLastnameChange = (e: any) => {
        setSignUp({
            ...signUp,
            lastname: e.target.value
        });
        setSignUpErrors({
            ...signUpErrors,
            lastnameError: "",
            isLastnameInErrorState: false
        });
    }

    const onPasswordChange = (e: any) => {
        setSignUp({
            ...signUp,
            password: e.target.value
        });
        setSignUpErrors({
            ...signUpErrors,
            passwordError: "",
            isPasswordInErrorState: false
        });
    }

    const onConfirmPasswordChange = (e: any) => {
        setSignUp({
            ...signUp,
            confirmPassword: e.target.value
        });
        setSignUpErrors({
            ...signUpErrors,
            confirmPasswordError: "",
            isConfirmPasswordInErrorState: false
        })
    }

    const onSubmitButtonPressed = () => {
        setSignUpErrors(getSignUpErrors(signUp));

        if (areThereErrors()) {
            return;
        }

        setLoadingState(true, grayoutCSSId);
    }

    const setLoadingState = (loading: boolean, id: string) => {
        setIsLoading(loading);
        setGrayoutId(id);
    }

    const areThereErrors = (): boolean => {
        return signUpErrors.emailError !== "" ||
            signUpErrors.firstnameError !== "" ||
            signUpErrors.lastnameError !== "" ||
            signUpErrors.passwordError !== "" ||
            signUpErrors.confirmPasswordError !== "";
    }

    return (
        <div>
            <NavBar title={navBarTitle} />
            <Container className="signupformcontainer">
                { isLoading &&
                     <LoadingIndicator 
                        isLoading={isLoading}
                        size={30}
                        ariaLabel="Loading"
                        testId={SignUpTestIds.loadingIndicator}
                    />
                }
                <Form className="Auth-form">
                    <h4 data-testid={SignUpTestIds.signUpHeader}>
                        {header}
                    </h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Email address*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={SignUpTestIds.floatingEmail}
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Email"
                        onChange={onEmailChange}
                        required
                        isInvalid={signUpErrors.isEmailInErrorState}
                        style={ {color: "black"} }
                        data-testid={SignUpTestIds.emailField}
                        />
                        { signUpErrors.isEmailInErrorState &&
                            <FormControlFeedback type="invalid" 
                                text={signUpErrors.emailError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="First Name*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={SignUpTestIds.floatingFirstname}
                    >
                        <Form.Control
                        placeholder="John"
                        className="me-2"
                        aria-label="Firstname"
                        onChange={onFirstnameChange}
                        required
                        isInvalid={signUpErrors.isFirstnameInErrorState}
                        style={ {color: "black"} }
                        data-testid={SignUpTestIds.firstNameField}
                        />
                        { signUpErrors.isFirstnameInErrorState &&
                            <FormControlFeedback type="invalid"
                                text={signUpErrors.firstnameError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Last Name*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={SignUpTestIds.floatingLastname}
                    >
                        <Form.Control
                        placeholder="Doe"
                        className="me-2"
                        aria-label="Lastname"
                        onChange={onLastnameChange}
                        required
                        isInvalid={signUpErrors.isLastnameInErrorState}
                        style={ {color: "black"} }
                        data-testid={SignUpTestIds.lastnameField}
                        />
                        { signUpErrors.isLastnameInErrorState &&
                            <FormControlFeedback 
                                type="invalid"
                                text={signUpErrors.lastnameError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Password*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={SignUpTestIds.floatingPassword}
                    >
                        <Form.Control
                        placeholder="name@example.com"
                        className="me-2"
                        aria-label="Password"
                        onChange={onPasswordChange}
                        required
                        isInvalid={signUpErrors.isPasswordInErrorState}
                        style={ {color: "black"} }
                        type="password"
                        data-testid={SignUpTestIds.passwordField}
                        />
                        { signUpErrors.isPasswordInErrorState &&
                            <FormControlFeedback 
                                type="invalid"
                                text={signUpErrors.passwordError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm Password*"
                    className="mb-3"
                    style={ {color: "black"} }
                    data-testid={SignUpTestIds.floatingConfirmPassowrdField}
                    >
                        <Form.Control
                        placeholder="password"
                        className="me-2"
                        aria-label="Confirm Password"
                        onChange={onConfirmPasswordChange}
                        required
                        isInvalid={signUpErrors.isConfirmPasswordInErrorState}
                        type="password"
                        style={ {color: "black"} }
                        data-testid={SignUpTestIds.confirmPasswordField}
                        />
                        { signUpErrors.isPasswordInErrorState &&
                            <FormControlFeedback
                                type="invalid"
                                text={signUpErrors.confirmPasswordError}
                            />
                        }
                    </FloatingLabel>
                    <Row style={{padding: "10px"}}>
                        <Col>
                            <Nav data-testid={SignUpTestIds.loginLink}>
                                <Link to="/login">{loginLink}</Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={onSubmitButtonPressed}
                         data-testid={SignUpTestIds.submit}>
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    );

}