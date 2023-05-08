import { LoginSignUpConstants } from "../../constants/LoginSignUpConstants";
import { getSignUpErrors } from "../../functions/getSignUpErrors";
import { SignUpConfirmPasswordBuilder } from "../../model/builders/SignUpBuilder";
import { SignUpErrorBuilder } from "../../model/builders/SignUpErrorBuilder";
import { SignUpConfirmPassword } from "../../model/interfaces/signup/SignUp";
import { SignUpErrors } from "../../model/interfaces/signup/SignUpErrors";

describe("getSignUpError tests", () => {
    const testEmail: string = "noname@email.com";
    const testFirstname: string = "John";
    const testLastname: string = "Doe";
    const passwords: string[] = [
        "password72:_",
        "HelloWorld94;",
        "HelloWorld72_",
        "_37aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "a72;"
    ];

    const reversePasswords = (passwordsToRevere: string[]): string[] => {
        return passwordsToRevere.slice().reverse(); 
    }

    const assertSignUpErrors = (errors: SignUpErrors[]) => {
        const [actual, expected] = errors;

        expect(actual.emailError).toBe(expected.emailError);
        expect(actual.firstnameError).toBe(expected.firstnameError);
        expect(actual.lastnameError).toBe(expected.lastnameError);
        expect(actual.passwordError).toBe(expected.passwordError);
        expect(actual.confirmPasswordError).toBe(expected.confirmPasswordError);
        expect(actual.isEmailInErrorState).toBe(expected.isEmailInErrorState);
        expect(actual.isFirstnameInErrorState).toBe(expected.isFirstnameInErrorState);
        expect(actual.isLastnameInErrorState).toBe(expected.isLastnameInErrorState);
        expect(actual.isPasswordInErrorState).toBe(expected.isPasswordInErrorState);
        expect(actual.isConfirmPasswordInErrorState).toBe(expected.isConfirmPasswordInErrorState);
    }

    test("when passed in valid sign up, there should be no errors", () => {
        const expectedError = new SignUpErrorBuilder()
            .build();
        const signUp = new SignUpConfirmPasswordBuilder()
            .setEmail(testEmail)
            .setFirstname(testFirstname)
            .setLastname(testLastname)
            .setPassword(passwords[0])
            .setConfirmPassword(passwords[0])
            .build();
        
        const actualErrors = getSignUpErrors(signUp);

        assertSignUpErrors([actualErrors, expectedError]);
    });

    test("when passed in a empty sign up, all fields should be in an error state", () => {
        const expectedError = new SignUpErrorBuilder()
            .setEmailState({emailError: LoginSignUpConstants.emailAddressIsEmpty, isEmailInErrorState: true})
            .setFirstnameState({fnameError: "Firstname is empty.", errorState: true})
            .setLastnameState({lnameError: "Lastname is empty.", errorState: true})
            .setPasswordState({pError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .setConfirmPasswordState({cPError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .build();
        const signUp = new SignUpConfirmPasswordBuilder().build();

        const actualErrors = getSignUpErrors(signUp);

        assertSignUpErrors([actualErrors, expectedError]);
    });

    test("when passed in passwords that don't match," 
    + "password and confirm password should have errors", () => {
        const expectedError = new SignUpErrorBuilder()
            .setEmailState({emailError: "", isEmailInErrorState: false})
            .setFirstnameState({fnameError: "", errorState: false})
            .setLastnameState({lnameError: "", errorState: false})
            .setPasswordState({pError: LoginSignUpConstants.passwordsDoNotMatch, errorState: true})
            .setConfirmPasswordState({cPError: LoginSignUpConstants.passwordsDoNotMatch, errorState: true})
            .build();

        const signUp = new SignUpConfirmPasswordBuilder()
            .setEmail("noname@email.com")
            .setFirstname("John")
            .setLastname("Doe")
            .setPassword(passwords[0])
            .setConfirmPassword(passwords[1])
            .build();

        const actualError = getSignUpErrors(signUp);

        assertSignUpErrors([actualError, expectedError]);

    });

    test("when passed in passwords that are too short," + 
    "passwords fields should have errors", () => {
        const [shortPassword,] = reversePasswords(passwords);
        
        const expectedError = new SignUpErrorBuilder()
            .setEmailState({emailError: "", isEmailInErrorState: false})
            .setFirstnameState({fnameError: "", errorState: false})
            .setLastnameState({lnameError: "", errorState: false})
            .setPasswordState({pError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .setConfirmPasswordState({cPError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .build();

        const signUp: SignUpConfirmPassword = new SignUpConfirmPasswordBuilder()
            .setEmail(testEmail)
            .setFirstname(testFirstname)
            .setLastname(testLastname)
            .setPassword(shortPassword)
            .setConfirmPassword(shortPassword)
            .build();

        const actualError = getSignUpErrors(signUp);
        assertSignUpErrors([actualError, expectedError]);
    });

    test("when passed in passwords that are too long," + 
    "passwords fields should have errors", () => {
        const longPassword = passwords[3];
        
        const expectedError = new SignUpErrorBuilder()
            .setEmailState({emailError: "", isEmailInErrorState: false})
            .setFirstnameState({fnameError: "", errorState: false})
            .setLastnameState({lnameError: "", errorState: false})
            .setPasswordState({pError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .setConfirmPasswordState({cPError: LoginSignUpConstants.passwordContainsSpecialCharacters, errorState: true})
            .build();

        const signUp: SignUpConfirmPassword = new SignUpConfirmPasswordBuilder()
            .setEmail(testEmail)
            .setFirstname(testFirstname)
            .setLastname(testLastname)
            .setPassword(longPassword)
            .setConfirmPassword(longPassword)
            .build();

        const actualError = getSignUpErrors(signUp);
        assertSignUpErrors([actualError, expectedError]);
    });
})