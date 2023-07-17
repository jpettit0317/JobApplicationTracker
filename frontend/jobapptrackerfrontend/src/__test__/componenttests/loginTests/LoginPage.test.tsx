import { render } from '@testing-library/react';
import { LoginPage } from '../../../components/login/LoginPage';
import userEvent from '@testing-library/user-event';
import { LoginFormIds } from '../../../components/login/constants/LoginFormIds';
import { 
    assertElementsAreInDocument,
    assertElementsAreNotInDocument,
    areHTMLElementsNull,
    isHTMLElementNull
} from '../../helperfunctions/assertions/htmlElementAssertions';
import { getElement } from '../../helperfunctions/htmlelements/getElement';
import { changeState, renderJSXElementWithRoute, waitForChanges } from '../../helperfunctions/setup/uitestsetup';
import { assertMockLoginuserHasBeenCalledTimes } from '../../helperfunctions/assertions/loginpageassertions';
import {
    validLogins,
    invalidLogins,
    loginRoute,
    createResolvingMockFunction,
    validHttpResponse
} from "../../helpervars/loginvars/loginvars";
import { HttpResponseBuilder } from '../../../model/builders/HttpResponseBuilder';
import { HttpStatusCodes } from '../../../enums/HttpStatusCodes_enum';
import { JobAppListPageTestIds } from '../../../components/jobapplist/JobAppListPageTestIds';

describe('Login Page UI tests', () => {
    const loginUserPath = "../../../functions/networkcalls/loginUser";

    const renderLoginPage = () => {
        renderJSXElementWithRoute([loginRoute], <LoginPage />); 
    }
    
    describe('render test', () => {
        test('should render correctly', () => {
            renderLoginPage();
            
            const mockLoginUser = createResolvingMockFunction(validHttpResponse);
            jest.mock(loginUserPath, () => {
                loginUser: mockLoginUser
            });
            const idsInDocument = [
                LoginFormIds.loginHeader,
                LoginFormIds.navBar,
                LoginFormIds.navBarBrand,
                LoginFormIds.floatingEmail,
                LoginFormIds.emailField,
                LoginFormIds.floatingPassword,
                LoginFormIds.passwordField,
                LoginFormIds.signUpLink,
                LoginFormIds.submit
            ];

            const idsNotInDocument = [
                LoginFormIds.emailHelper,
                LoginFormIds.passwordHelper
            ];

            assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 0);
            assertElementsAreInDocument(idsInDocument);
            assertElementsAreNotInDocument(idsNotInDocument);
        });
    });
    describe('Entering data tests', () => {
        test('when submit button is pressed when there is no email or password should display errors', async () => {
            renderLoginPage();

            const submitButton = getElement(LoginFormIds.submit);
            const helperIds = [
                LoginFormIds.emailHelper,
                LoginFormIds.passwordHelper
            ];

            const mockLoginUser = createResolvingMockFunction(validHttpResponse);
            jest.mock(loginUserPath, () => {
                loginUser: mockLoginUser
            });

            if (isHTMLElementNull(submitButton)) {
                fail("Submit button doesn't exist");
            }

            changeState(() => {
                userEvent.click(submitButton!);
            });

            waitForChanges(() => {
                assertElementsAreInDocument(helperIds);
                assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 0);
            });
        });

        test('when login form has a valid email and password there should be no helper text', async () => {
            renderLoginPage();

            const ids = [
                LoginFormIds.emailHelper,
                LoginFormIds.passwordHelper
            ];

            const submitButton = getElement(LoginFormIds.submit);
            const emailField = getElement(LoginFormIds.emailField);
            const passwordField = getElement(LoginFormIds.passwordField);

            if (areHTMLElementsNull([submitButton, emailField, passwordField])) {
                fail("Submit button, Email field, or password field is null");
            }

            changeState(() => {
                userEvent.type(emailField!, validLogins[0].email);
                userEvent.type(passwordField!, validLogins[0].password);

                userEvent.click(submitButton!);
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(ids);
            });
        });
        
        test("when login form has an emoji in email and password, there should be errors", () => {
            renderLoginPage();

            const ids = [
                LoginFormIds.emailHelper,
                LoginFormIds.passwordHelper
            ];

            const submitButton = getElement(LoginFormIds.submit);
            const emailField = getElement(LoginFormIds.emailField);
            const passwordField = getElement(LoginFormIds.passwordField);

            if (areHTMLElementsNull([submitButton, emailField, passwordField])) {
                fail("Submit button, email field, or password field is null");
            }

            changeState(() => {
                userEvent.type(emailField!, invalidLogins[0].email);
                userEvent.type(passwordField!, invalidLogins[0].password);
                userEvent.click(submitButton!);
            });

            waitForChanges(() => {
                assertElementsAreInDocument(ids);
            });
        });

         test("when login form has a valid email and password with punctuation" +
         ", there should be no errors", () => {
            renderLoginPage();

            const mockLoginUser = createResolvingMockFunction(validHttpResponse);
            jest.mock(loginUserPath, () => {
                loginUser: mockLoginUser
            });

            const ids = [
                LoginFormIds.emailHelper,
                LoginFormIds.passwordHelper
            ];

            const submitButton = getElement(LoginFormIds.submit);
            const emailField = getElement(LoginFormIds.emailField);
            const passwordField = getElement(LoginFormIds.passwordField);

            if (areHTMLElementsNull([submitButton, emailField, passwordField])) {
                fail("Submit button, Email field, or password field is null");
            }

            changeState(() => {
                userEvent.type(emailField!, validLogins[1].email);
                userEvent.type(passwordField!, validLogins[1].password);

                userEvent.click(submitButton!);
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(ids);
                assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 1);
            });
        });
    });
    test("when login form has a password with a space and a valid email, " 
    + "there should be errors", () => {
        renderLoginPage();

        const presentIds = [
            LoginFormIds.passwordHelper
        ];
        const nonpresentIds = [
            LoginFormIds.emailHelper
        ];

        const mockLoginUser = createResolvingMockFunction(validHttpResponse);
        jest.mock(loginUserPath, () => {
            loginUser: mockLoginUser
        });

        const submitButton = getElement(LoginFormIds.submit);
        const emailField = getElement(LoginFormIds.emailField);
        const passwordField = getElement(LoginFormIds.passwordField);

        if (areHTMLElementsNull([submitButton, emailField, passwordField])) {
            fail("Submit button, Email field, or password field is null");
        }

        changeState(() => {
            userEvent.type(emailField!, invalidLogins[1].email);
            userEvent.type(passwordField!, invalidLogins[1].password);
            userEvent.click(submitButton!);
        });

        waitForChanges(() => {
            assertElementsAreInDocument(presentIds);
            assertElementsAreNotInDocument(nonpresentIds);
            assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 0);
        });
    });

    test("when login is invalid, there should be errors in email and password", () => {
        renderLoginPage();

        const presentIds = [
            LoginFormIds.passwordHelper,
            LoginFormIds.emailHelper
        ];
        const badUserInput = new HttpResponseBuilder("")
            .setErrorMessage("Invalid username or password")
            .setStatusCode(HttpStatusCodes.forbidden)
            .build();

        const mockLoginUser = createResolvingMockFunction(badUserInput);
        jest.mock(loginUserPath, () => {
            loginUser: mockLoginUser
        });

        const emailField = getElement(LoginFormIds.emailField);
        const passwordField = getElement(LoginFormIds.passwordField);
        const submitButton = getElement(LoginFormIds.submit);

        if (areHTMLElementsNull([emailField, passwordField, submitButton])) {
            fail("Submit button, Email field, or Password field is null.");
        }
        const invalidLogin = validLogins[0];

        changeState(() => {
            userEvent.type(emailField!, invalidLogin.email);
            userEvent.type(passwordField!, invalidLogin.password);
            userEvent.click(submitButton!);
        });

        waitForChanges(() => {
            assertElementsAreInDocument(presentIds);
            assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 1);
        });
    });

    test("when login is valid, there should be no errors and should be in Job App Page.", () => {
        renderLoginPage();

        const mockLoginUser = createResolvingMockFunction(validHttpResponse);
        jest.mock(loginUserPath, () => {
            loginUser: mockLoginUser
        });

        const emailField = getElement(LoginFormIds.emailField);
        const passwordField = getElement(LoginFormIds.passwordField);
        const submitButton = getElement(LoginFormIds.submit);
        
        if (areHTMLElementsNull([emailField, passwordField, submitButton])) {
            fail("Submit button, Email field, or Password field is null.");
        }
        const validLogin = validLogins[0];

        changeState(() => {
            userEvent.type(emailField!, validLogin.email);
            userEvent.type(passwordField!, validLogin.password);
            userEvent.click(submitButton!);
        });

        waitForChanges(() => {
            assertElementsAreInDocument([JobAppListPageTestIds.jobAppListPageHeader]);
            assertMockLoginuserHasBeenCalledTimes(mockLoginUser, 1);
        });
    });
});

export {};