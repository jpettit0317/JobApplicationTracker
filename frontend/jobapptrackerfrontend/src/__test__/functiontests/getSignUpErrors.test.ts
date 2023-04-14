import { getSignUpErrors } from "../../functions/getSignUpErrors";
import { SignUpConfirmPasswordBuilder } from "../../model/builders/SignUpBuilder";
import { SignUpErrorBuilder } from "../../model/builders/SignUpErrorBuilder";
import { SignUpErrors } from "../../model/interfaces/signup/SignUpErrors";

describe("getSignUpError tests", () => {
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
           .build();
        
           const actualErrors = getSignUpErrors(signUp);

           assertSignUpErrors([actualErrors, expectedError]);
    });
})