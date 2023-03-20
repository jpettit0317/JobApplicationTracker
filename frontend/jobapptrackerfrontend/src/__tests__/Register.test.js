import { Register, RegisterErrors } from "../models/SignUp/Register";
import { passwordNotInRange, 
    passwordsMismatch,
    emailAddressIsEmpty
} from "../constants/login-constants";

describe('Register tests', () => {
    const validUserEmail = "user@email.com";
    const validPassword = "validUser23;";

    const assertErrorsAreEqual = (actual, expected) => {
        expect(actual.getEmailError()).toBe(expected.getEmailError());
        expect(actual.getPasswordError()).toBe(expected.getPasswordError());
        expect(actual.getConfirmPasswordError()).toBe(expected.getConfirmPasswordError());
    }

    describe('getError tests', () => {
        test('when passed in empty values, should return errors for all fields', () => {
            const sut = new Register("", "", "");
            const expectedValue = new RegisterErrors(emailAddressIsEmpty,
                 passwordNotInRange, passwordNotInRange);
            const actualValue = sut.getErrors();

            assertErrorsAreEqual(actualValue, expectedValue);
        });

        test('when passed in valid values, should not return any errors', () => {
            const sut = new Register(validUserEmail, validPassword, validPassword);

            const expectedValue = new RegisterErrors("", "", "");
            const actualValue = sut.getErrors();

            assertErrorsAreEqual(actualValue, expectedValue);
        });
    });
});