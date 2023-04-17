import { render } from "@testing-library/react";
import { SignUpPage } from "../../../components/signup/SignUpPage";
import { MemoryRouter } from "react-router";
import { SignUpTestIds } from "../../../components/signup/SignUpTestIds";
import { areHTMLElementsNull, assertElementIsInDocument, assertElementIsNotInDocument, assertElementsAreInDocument, assertElementsAreNotInDocument, failIfHTMLElementIsNull, failIfHTMLElementsAreNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { changeState, renderJSXElement, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { SignUpConfirmPasswordBuilder } from "../../../model/builders/SignUpBuilder";
import userEvent from "@testing-library/user-event";

describe("Sign Up Page tests", () => {
    const signUpRoute: string = "/signup";
    
    const validEmail: string = "noname@example.com";
    const validPasswords: string[] = [
        "password94_",
        "password79_"
    ];
    const fullname: {firstname: string, lastname: string} = {
        firstname: "John",
        lastname: "Doe"
    };
    const emojiEmail: string = "noname😍@email.com";
    const emojiPassword: string = "password94_😡";

    const renderSignUpPage = () => {
        renderJSXElement([signUpRoute], <SignUpPage />);   
    }

    describe("Render tests", () => {
        test("when sign up page is first loaded, there should be no errors" + 
        "or loading indicators", () => {
            renderSignUpPage();

            const presentIds: string[] = [
                SignUpTestIds.signUpHeader,
                SignUpTestIds.floatingEmail,
                SignUpTestIds.emailField,
                SignUpTestIds.floatingFirstname,
                SignUpTestIds.firstNameField,
                SignUpTestIds.floatingLastname,
                SignUpTestIds.lastnameField,
                SignUpTestIds.floatingPassword,
                SignUpTestIds.passwordField,
                SignUpTestIds.floatingConfirmPassowrdField,
                SignUpTestIds.confirmPasswordField,
                SignUpTestIds.loginLink,
                SignUpTestIds.submit,
            ];

            const nonPresentIds: string[] = [
                SignUpTestIds.loadingIndicator,
                SignUpTestIds.emailHelper,
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            assertElementsAreInDocument(presentIds);
            assertElementsAreNotInDocument(nonPresentIds);
        });
    });

    describe("Filling in field tests", () => {
        test("when sign up has all fields filled in, there should be a loading "
        + "indicator and no errors", () => {
            renderSignUpPage();
            
            const validSignUp = new SignUpConfirmPasswordBuilder()
                .setEmail(validEmail)
                .setFirstname(fullname.firstname)
                .setLastname(fullname.lastname)
                .setPassword(validPasswords[0])
                .setConfirmPassword(validPasswords[0])
                .build();
            
            const emailField = getElement(SignUpTestIds.emailField);
            const firstnameField = getElement(SignUpTestIds.firstNameField);
            const lastnameField = getElement(SignUpTestIds.lastnameField);
            const passwordField = getElement(SignUpTestIds.passwordField);
            const confirmPassword = getElement(SignUpTestIds.confirmPasswordField);
            const submitButton = getElement(SignUpTestIds.submit);
            const loadingIndicator = getElement(SignUpTestIds.loadingIndicator);

            const htmlElements = [
                emailField,
                firstnameField,
                lastnameField,
                passwordField,
                confirmPassword,
                submitButton
            ];

            failIfHTMLElementsAreNull(htmlElements, "HTML Elements are null.");

            const nonPresentIds: string[] = [
                SignUpTestIds.emailHelper,
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            changeState(() => {
                userEvent.type(emailField!, validSignUp.email);
                userEvent.type(firstnameField!, validSignUp.firstname);
                userEvent.type(lastnameField!, validSignUp.lastname);
                userEvent.type(passwordField!, validSignUp.password);
                userEvent.type(confirmPassword!, validSignUp.confirmPassword);

                userEvent.click(submitButton!);
            })

            waitForChanges(() => {
                assertElementIsInDocument(loadingIndicator);
                assertElementsAreNotInDocument(nonPresentIds);
            });
        });

        test("when sign up has no fields filled in, there should be no loading "
        + "indicator and all errors", () => {
            renderSignUpPage();
            
            const submitButton = getElement(SignUpTestIds.submit);
            const loadingIndicator = getElement(SignUpTestIds.loadingIndicator);

            failIfHTMLElementIsNull(submitButton, "Submit button is null.");

            const presentIds: string[] = [
                SignUpTestIds.emailHelper,
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            changeState(() => {
                userEvent.click(submitButton!);
            })

            waitForChanges(() => {
                assertElementIsNotInDocument(loadingIndicator);
                assertElementsAreInDocument(presentIds);
            });
        });
        
        test("when sign up email, password, and confirm password have emojis,"
        + "there should be an error for email, password and confirm password"
        , () => {
            renderSignUpPage();
            
            const invalidSignUp = new SignUpConfirmPasswordBuilder()
                .setEmail(emojiEmail)
                .setFirstname(fullname.firstname)
                .setLastname(fullname.lastname)
                .setPassword(emojiPassword)
                .setConfirmPassword(emojiPassword)
                .build();
            
            const emailField = getElement(SignUpTestIds.emailField);
            const firstnameField = getElement(SignUpTestIds.firstNameField);
            const lastnameField = getElement(SignUpTestIds.lastnameField);
            const passwordField = getElement(SignUpTestIds.passwordField);
            const confirmPassword = getElement(SignUpTestIds.confirmPasswordField);
            const submitButton = getElement(SignUpTestIds.submit);

            const htmlElements = [
                emailField,
                firstnameField,
                lastnameField,
                passwordField,
                confirmPassword,
                submitButton
            ];

            failIfHTMLElementsAreNull(htmlElements, "HTML elements are null.");

            const nonPresentIds: string[] = [
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.loadingIndicator
            ];

            const presentIds: string[] = [
                SignUpTestIds.emailHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            changeState(() => {
                userEvent.type(emailField!, invalidSignUp.email);
                userEvent.type(firstnameField!, invalidSignUp.firstname);
                userEvent.type(lastnameField!, invalidSignUp.lastname);
                userEvent.type(passwordField!, invalidSignUp.password);
                userEvent.type(confirmPassword!, invalidSignUp.confirmPassword);

                userEvent.click(submitButton!);
            })

            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementsAreInDocument(presentIds);
            });
        });

        test("when passwords don't match, "
        + "there should be a password field error,"
        + "confirm password field error and no loading indicator", () => {
            renderSignUpPage();

            const invalidSignUp = new SignUpConfirmPasswordBuilder()
                .setEmail(validEmail)
                .setFirstname(fullname.firstname)
                .setLastname(fullname.lastname)
                .setPassword(validPasswords[0])
                .setConfirmPassword(validPasswords[1])
                .build();
            
            const emailField = getElement(SignUpTestIds.emailField);
            const firstnameField = getElement(SignUpTestIds.firstNameField);
            const lastnameField = getElement(SignUpTestIds.lastnameField);
            const passwordField = getElement(SignUpTestIds.passwordField);
            const confirmPassword = getElement(SignUpTestIds.confirmPasswordField);
            const submitButton = getElement(SignUpTestIds.submit);

            const htmlElements = [
                emailField,
                firstnameField,
                lastnameField,
                passwordField,
                confirmPassword,
                submitButton
            ];

            failIfHTMLElementsAreNull(htmlElements, "HTML elements are null.");

            const nonPresentIds: string[] = [
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.loadingIndicator
            ];

            const presentIds: string[] = [
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            changeState(() => {
                userEvent.type(emailField!, invalidSignUp.email);
                userEvent.type(firstnameField!, invalidSignUp.firstname);
                userEvent.type(lastnameField!, invalidSignUp.lastname);
                userEvent.type(passwordField!, invalidSignUp.password);
                userEvent.type(confirmPassword!, invalidSignUp.confirmPassword);

                userEvent.click(submitButton!);
            })

            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementsAreInDocument(presentIds);
            });
        });
    });
});