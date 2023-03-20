import { render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from '../components/Login/LoginPage';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { passwordNotInRange,
    emailAddressIsEmpty,
    passwordsMismatch 
} from '../constants/login-constants';

describe('Login Page ui tests', () => {
    const testIds = {
        loginHeader: "loginHeader",
        floatingEmailAddress: "floatingEmailAddress",
        floatingPassword: "floatingPassword",
        emailField: "emailField",
        emailHelper: "emailHelperText",
        passwordField: "passwordField",
        passwordHelperText: "passwordHelperText",
        signUpLink: "signuplink",
        resetPasswordLink: "resetPasswordlink",
        submitButton: "loginSubmit",
        navBar: "navbar",
        navBarBrand: "navbarbrand"
    };

    test('test if LoginPage renders correctly', () => {
        render(<LoginPage />);

        const loginHeader = screen.getByTestId(testIds.loginHeader);
        const navBar = screen.getByTestId(testIds.navBar);
        const navBarBrand = screen.getByTestId(testIds.navBarBrand);
        const floatingEmailAddress = screen.getByTestId(testIds.floatingEmailAddress);
        const emailField = screen.getByTestId(testIds.emailField);
        const emailHelper = screen.getByTestId(testIds.emailHelper);
        const passwordField = screen.getByTestId(testIds.passwordField);
        const floatingPassword = screen.getByTestId(testIds.floatingPassword);
        const signUpLink = screen.getByTestId(testIds.signUpLink);
        const resetPasswordLink = screen.getByTestId(testIds.resetPasswordLink);
        const loginSubmit = screen.getByTestId(testIds.submitButton);

        expect(loginHeader).toBeInTheDocument();
        expect(navBar).toBeInTheDocument();
        expect(navBarBrand).toBeInTheDocument();
        expect(floatingEmailAddress).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(emailHelper).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(floatingPassword).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        expect(resetPasswordLink).toBeInTheDocument();
        expect(loginSubmit).toBeInTheDocument();
    });

    test('when there is no username and password, pressing the login button should produce errors', async () => {
        render(<LoginPage />);

        act(() => {
            userEvent.click(screen.getByText(/submit/i));
        });
        
        await waitFor(async () => {
            expect(screen.getByText(/Email address is empty./i)).toBeInTheDocument();
            expect(screen.getByText(/Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji./i))
            .toBeInTheDocument();
        });
    });
});