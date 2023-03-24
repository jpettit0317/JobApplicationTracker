import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { RegisterPage } from "../components/Register/RegisterPage";


describe('Register Page UI tests', () => {
    const route = "/register";

    const testIds = {
        floatingEmailLabel: "floatingEmailAddress",
        emailAddress: "emailAddress",
        emailAddressHelperText: "emailAddressHelperText",
        floatingPassword: "floatingPassword",
        passwordHelperText: "passwordHelperText",
        floatingConfirmPassword: "floatingConfirmPassword",
        confirmPassword: "confirmPassword",
        confirmPasswordHelperText: "confirmPasswordHelperText",
        passwordField: "password",
        loginLink: "loginLink",
        submit: "submit",
        registerHeader: "registerHeader",
        navBar: "navbar"
    };

    const login = {
        email: "test@test.com",
        password: "root;Beer09",
    };

    const emojiLogin = {
        email: "test@test.com",
        password: "Hello World! 🤣"
    };

    const testTitles = [
        "when passed in a password and confirmPassword with no letters, there should be errors underneath them"
    ];

    const renderRegisterPage = (route) => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <RegisterPage />
            </MemoryRouter>
        );
    }

    describe('renders correctly', () => {
        test('on render there should be no errors', () => {
            renderRegisterPage(route);(route); 

            const registerHeader = screen.getByTestId(testIds.registerHeader);
            const floatingEmailAddress = screen.getByTestId(testIds.floatingEmailLabel);
            const emailAddress = screen.getByTestId(testIds.emailAddress);
            const floatingConfirmPassword = screen.getByTestId(testIds.floatingConfirmPassword);
            const confirmPasswordField = screen.getByTestId(testIds.confirmPassword);
            const floatingPassword = screen.getByTestId(testIds.floatingPassword);
            const passwordHelperText = screen.queryByTestId(testIds.passwordHelperText);
            const emailAddressHelper = screen.queryByTestId(testIds.emailAddressHelperText);
            const confirmPasswordHelper = screen.queryByTestId(testIds.confirmPasswordHelperText);
            const passwordField = screen.getByTestId(testIds.passwordField);
            const loginLink = screen.getByTestId(testIds.loginLink);
            const submitButton = screen.getByTestId(testIds.submit);
            const navBar = screen.getByTestId(testIds.navBar);

            expect(loginLink).toBeInTheDocument();
            expect(registerHeader).toBeInTheDocument();
            expect(floatingEmailAddress).toBeInTheDocument();
            expect(emailAddress).toBeInTheDocument();            
            expect(floatingPassword).toBeInTheDocument();
            expect(floatingConfirmPassword).toBeInTheDocument();
            expect(passwordField).toBeInTheDocument();
            expect(confirmPasswordField).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
            expect(navBar).toBeInTheDocument();

            expect(emailAddressHelper).not.toBeInTheDocument();
            expect(passwordHelperText).not.toBeInTheDocument();
            expect(confirmPasswordHelper).not.toBeInTheDocument();
        });
    });

    describe('changing value tests', () => {
        test('when username, password, and confirm password is empty' +
        ' there should be errors on all three fields', async () => {
            renderRegisterPage(route);(route); 

            act(() => {
                userEvent.click(screen.getByText(/submit/i));
            });

            await waitFor(() => {
                expect(screen.getByText(/Email address is empty./i)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).toBeInTheDocument();
            });
        });
        test('when username, password, confirmPassword is valid, there should be no errors', async () => {
            renderRegisterPage(route);(route);;

            act(() => {
                const emailField = screen.getByTestId(testIds.emailAddress);
                const passwordField = screen.getByTestId(testIds.passwordField);
                const confirmPassWordField = screen.getByTestId(testIds.confirmPassword);

                userEvent.type(emailField, login.email);
                userEvent.type(passwordField, login.password);
                userEvent.type(confirmPassWordField, login.password);

                userEvent.click(screen.getByText(/submit/i));
            });

            await waitFor(() => {
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).not.toBeInTheDocument();
            });
        });
        test('when username is valid, but password and confirmPassword is not equal, should return passwords do not match', async () => {
            const mismatchPassword = login.password + "@";
            renderRegisterPage(route); 

            act(() => {
                const emailField = screen.getByTestId(testIds.emailAddress);
                const passwordField = screen.getByTestId(testIds.passwordField);
                const confirmPassWordField = screen.getByTestId(testIds.confirmPassword);

                userEvent.type(emailField, login.email);
                userEvent.type(passwordField, login.password);
                userEvent.type(confirmPassWordField, mismatchPassword);

                userEvent.click(screen.getByText(/submit/i)); 
            });

            await waitFor(() => {
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).toBeInTheDocument();
            });
        });

        test('when username is valid, but password and confirm password has an emoji,' +
        ' password and confirm password should have an error underneath them', async () => {
            renderRegisterPage(route);
            
            act(() => {
                const emailField = screen.getByTestId(testIds.emailAddress);
                const passwordField = screen.getByTestId(testIds.passwordField);
                const confirmPassWordField = screen.getByTestId(testIds.confirmPassword);

                userEvent.type(emailField, emojiLogin.email);
                userEvent.type(passwordField, emojiLogin.password);
                userEvent.type(confirmPassWordField, emojiLogin.password);

                userEvent.click(screen.getByText(/submit/i)); 
            });

            await waitFor(() => {
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).toBeInTheDocument();
            });
        });

        test('when username is valid, password and confirmPassword contain a space' +
        ' there should be an error beneath password and confirm password', async () => {
            renderRegisterPage(route);
            const spacePassword = "pass word94;";

            act(() => {
                const emailField = screen.getByTestId(testIds.emailAddress);
                const passwordField = screen.getByTestId(testIds.passwordField);
                const confirmPassWordField = screen.getByTestId(testIds.confirmPassword);

                userEvent.type(emailField, emojiLogin.email);
                userEvent.type(passwordField, spacePassword);
                userEvent.type(confirmPassWordField, spacePassword);

                userEvent.click(screen.getByText(/submit/i)); 
            });

            await waitFor(() => {
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).toBeInTheDocument();
            });
        })
        
        it(testTitles[0], async () => {
            renderRegisterPage(route);
            const numberPassword = "100000000";

            act(() => {
                const emailField = screen.getByTestId(testIds.emailAddress);
                const passwordField = screen.getByTestId(testIds.passwordField);
                const confirmPassWordField = screen.getByTestId(testIds.confirmPassword);

                userEvent.type(emailField, emojiLogin.email);
                userEvent.type(passwordField, numberPassword);
                userEvent.type(confirmPassWordField, numberPassword);

                userEvent.click(screen.getByText(/submit/i)); 
            });

            await waitFor(() => {
                expect(screen.queryByTestId(testIds.emailAddressHelperText)).not.toBeInTheDocument();
                expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
                expect(screen.queryByTestId(testIds.confirmPasswordHelperText)).toBeInTheDocument();
            }); 
        });
    });
});