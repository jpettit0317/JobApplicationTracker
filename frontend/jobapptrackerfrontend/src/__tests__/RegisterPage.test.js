import { render, screen } from "@testing-library/react";
import { RegisterPage } from "../components/Register/RegisterPage";


describe('Register Page UI tests', () => {
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
        registerHeader: "registerHeader"
    };

    describe('renders correctly', () => {
        test('on render there should be no errors', () => {
            render(<RegisterPage />);

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

            expect(loginLink).toBeInTheDocument();
            expect(registerHeader).toBeInTheDocument();
            expect(floatingEmailAddress).toBeInTheDocument();
            expect(emailAddress).toBeInTheDocument();            
            expect(floatingPassword).toBeInTheDocument();
            expect(floatingConfirmPassword).toBeInTheDocument();
            expect(passwordField).toBeInTheDocument();
            expect(confirmPasswordField).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();

            expect(emailAddressHelper).not.toBeInTheDocument();
            expect(passwordHelperText).not.toBeInTheDocument();
            expect(confirmPasswordHelper).not.toBeInTheDocument();
        });
    });
});