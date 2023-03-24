import { render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from '../components/Login/LoginPage';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { passwordNotInRange,
    emailAddressIsEmpty,
    passwordsMismatch 
} from '../constants/usersignlogin-constants';
import { MemoryRouter } from 'react-router';

describe('Login Page ui tests', () => {
    const route = "/login";

    const testIds = {
        loginHeader: "loginHeader",
        floatingEmailAddress: "floatingEmailAddress",
        floatingPassword: "floatingPassword",
        emailField: "emailField",
        emailHelper: "emailHelperText",
        passwordField: "passwordField",
        passwordHelperText: "passwordHelperText",
        signUpLink: "signuplink",
        submitButton: "loginSubmit",
        navBar: "navbar",
        navBarBrand: "navbarbrand"
    };

    const login = {
        email: "test@test.com",
        password: "root;Beer09"
    };

    const emojiLogin = {
        email: "test@test.com",
        password: "Hello World! 🤣"
    };

    const renderLoginPage = (route) => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <LoginPage />
            </MemoryRouter>
        );
    }

    test('test if LoginPage renders correctly', () => {
        renderLoginPage(route); 

        const loginHeader = screen.getByTestId(testIds.loginHeader);
        const navBar = screen.getByTestId(testIds.navBar);
        const navBarBrand = screen.getByTestId(testIds.navBarBrand);
        const floatingEmailAddress = screen.getByTestId(testIds.floatingEmailAddress);
        const emailField = screen.getByTestId(testIds.emailField);
        const passwordField = screen.getByTestId(testIds.passwordField);
        const floatingPassword = screen.getByTestId(testIds.floatingPassword);
        const signUpLink = screen.getByTestId(testIds.signUpLink);
        const loginSubmit = screen.getByTestId(testIds.submitButton);

        expect(loginHeader).toBeInTheDocument();
        expect(navBar).toBeInTheDocument();
        expect(navBarBrand).toBeInTheDocument();
        expect(floatingEmailAddress).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(screen.queryByTestId(testIds.emailHelper)).not.toBeInTheDocument(); 
        expect(screen.queryByTestId(testIds.passwordHelperText)).not.toBeInTheDocument(); 
        expect(passwordField).toBeInTheDocument();
        expect(floatingPassword).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        expect(loginSubmit).toBeInTheDocument();
    });

    test('when there is no username and password, pressing the login button should produce errors', async () => {
        renderLoginPage(route);

        act(() => {
            userEvent.click(screen.getByText(/submit/i));
        });
        
        await waitFor(async () => {
            expect(screen.getByText(/Email address is empty./i)).toBeInTheDocument();
            expect(screen.getByText(/Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji./i))
            .toBeInTheDocument();
        });
    });

    test('when passed in a valid email and password, there should be no errors', async () => {
        

        renderLoginPage(route);
        act(() => {
            const emailField = screen.getByTestId(testIds.emailField);
            const passwordField = screen.getByTestId(testIds.passwordField);

            userEvent.type(emailField, login.email);
            userEvent.type(passwordField, login.password);

            userEvent.click(screen.getByText(/submit/i));
        });

        await waitFor(async () => {
            expect(screen.queryByTestId(testIds.emailHelper)).not.toBeInTheDocument();
            expect(screen.queryByTestId(testIds.passwordHelperText)).not.toBeInTheDocument();
        });
    });

    test('when passed in a valid email and emoji password,' +
    ' should return no error for email and an error for password', async () => {
        renderLoginPage(route);

        act(() => {
            const emailField = screen.getByTestId(testIds.emailField);
            const passwordField = screen.getByTestId(testIds.passwordField);

            userEvent.type(emailField, emojiLogin.email);
            userEvent.type(passwordField, emojiLogin.password);

            userEvent.click(screen.getByText(/submit/i));
        });

        await waitFor(() => {
            expect(screen.queryByTestId(testIds.emailHelper)).not.toBeInTheDocument();
            expect(screen.queryByTestId(testIds.passwordHelperText)).toBeInTheDocument();
        });
    });
});