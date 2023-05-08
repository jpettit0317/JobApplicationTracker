import { SignUpPage } from "../../../components/signup/SignUpPage";
import { SignUpTestIds } from "../../../components/signup/SignUpTestIds";
import { assertElementIsInDocument, assertElementIsNotInDocument, assertElementsAreInDocument, assertElementsAreNotInDocument, failIfHTMLElementIsNull, failIfHTMLElementsAreNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { changeState, renderJSXElement, renderJSXElementWithRoute, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { SignUpConfirmPasswordBuilder } from "../../../model/builders/SignUpBuilder";
import userEvent from "@testing-library/user-event";
import { SignUp, SignUpConfirmPassword } from "../../../model/interfaces/signup/SignUp";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { getToken } from "../../../functions/session/getToken";
import { JobAppListPageTestIds } from "../../../components/jobapplist/JobAppListPageTestIds";
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { HttpStatusCodes } from "../../../enums/HttpStatusCodes_enum";

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
        renderJSXElementWithRoute([signUpRoute], <SignUpPage />);   
    }

    const assertMockFunctionHasBeenCalledTimes = (amount: number = 0,
        mockFn: jest.Mock<Promise<HttpResponse<string>>,
        [signUp: SignUp, url: string]>) => {
        expect(mockFn).toBeCalledTimes(amount);
    }

    describe("Render tests", () => {
        test("when sign up page is first loaded, there should be no errors" + 
        "or loading indicators", () => {
            renderSignUpPage();

            const defaultHttpResponse: HttpResponse<string> =
                new HttpResponseBuilder<string>("Token")
                    .setErrorMessage("")
                    .setStatusCode(200)
                    .build();
            
            const mockAddUser = jest.fn(async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(defaultHttpResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });

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
            assertMockFunctionHasBeenCalledTimes(0, mockAddUser);
        });
    });

    describe("Filling in field tests", () => {
        test("when sign up has all fields filled in" +
        "should take the user to "  ,() => {
            renderSignUpPage();
            debugger; 
            const defaultTokenValue = "Token";
            const defaultHttpResponse: HttpResponse<string> =
                new HttpResponseBuilder<string>(defaultTokenValue)
                    .setErrorMessage("")
                    .setStatusCode(200)
                    .build();
            
            const mockAddUser = jest.fn(async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(defaultHttpResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });
            
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
            });


            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementsAreInDocument([
                    JobAppListPageTestIds.jobAppListPageHeader
                ]);
                assertMockFunctionHasBeenCalledTimes(1, mockAddUser);
            });
        });

        test("when sign up has no fields filled in, there should be no loading "
        + "indicator and all errors", () => {
            renderSignUpPage();
            
            const defaultHttpResponse: HttpResponse<string> =
                new HttpResponseBuilder<string>("")
                    .setErrorMessage("Error message")
                    .setStatusCode(400)
                    .build();
            
            const mockAddUser = jest.fn((signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(defaultHttpResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });

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
            });

            waitForChanges(() => {
                assertElementIsNotInDocument(loadingIndicator);
                assertElementsAreInDocument(presentIds);
                assertMockFunctionHasBeenCalledTimes(0, mockAddUser);
            });
        });
        
        test("when sign up email, password, and confirm password have emojis,"
        + "there should be an error for email, password and confirm password"
        , () => {
            renderSignUpPage();
          
            const defaultHttpResponse: HttpResponse<string> =
            new HttpResponseBuilder<string>("")
                .setErrorMessage("Error message")
                .setStatusCode(400)
                .build();

            const mockAddUser = jest.fn(async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(defaultHttpResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });

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
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementsAreInDocument(presentIds);
                assertMockFunctionHasBeenCalledTimes(0, mockAddUser);
            });
        });

        test("when passwords don't match, "
        + "there should be a password field error,"
        + "confirm password field error and no loading indicator", () => {
            renderSignUpPage();

            const defaultHttpResponse: HttpResponse<string> =
            new HttpResponseBuilder<string>("")
                .setErrorMessage("Error message")
                .setStatusCode(400)
                .build();

            const mockAddUser = jest.fn(async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(defaultHttpResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });

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
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementsAreInDocument(presentIds);
                assertMockFunctionHasBeenCalledTimes(0, mockAddUser);
            });
        });

        test("when passed in an email that exists, email should have an error", () => {
            renderSignUpPage();
            const signUp: SignUpConfirmPassword = {
                email: "noname@email.com",
                firstname: "John",
                lastname: "Doe",
                password: "password94_",
                confirmPassword: "password94_"
            };
            const emailFieldError = signUp.email + " already exists.";
            const userExistsResponse = new HttpResponseBuilder<string>("")
                .setErrorMessage(emailFieldError)
                .setErrorType(HttpResponseErrorType.userExists)
                .setStatusCode(HttpStatusCodes.forbidden)
                .build();

            const mockAddUser = jest.fn(async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => Promise.resolve(userExistsResponse));
            jest.mock("../../../functions/networkcalls/addUser", () => {
                addUser: mockAddUser 
            });

            const nonPresentIds = [
                SignUpTestIds.confirmPasswordHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper
            ];

            const emailField = getElement(SignUpTestIds.emailField);
            const firstnameField = getElement(SignUpTestIds.firstNameField);
            const lastnameField = getElement(SignUpTestIds.lastnameField);
            const passwordField = getElement(SignUpTestIds.passwordField);
            const confirmPassword = getElement(SignUpTestIds.confirmPasswordField);
            const submitButton = getElement(SignUpTestIds.submit);
    
            const presentHtmlElements = [
                emailField,
                firstnameField,
                lastnameField,
                passwordField,
                confirmPassword,
                submitButton
            ];


            failIfHTMLElementsAreNull(presentHtmlElements);

            changeState( () => {
                userEvent.type(emailField!, signUp.email);
                userEvent.type(firstnameField!, signUp.firstname);
                userEvent.type(lastnameField!, signUp.lastname);
                userEvent.type(passwordField!, signUp.password);
                userEvent.type(confirmPassword!, signUp.confirmPassword);

                userEvent.click(submitButton!); 
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentIds);
                assertElementIsInDocument(getElement(SignUpTestIds.emailHelper));
                assertMockFunctionHasBeenCalledTimes(1, mockAddUser);
            });
        });
    });
});

export {};