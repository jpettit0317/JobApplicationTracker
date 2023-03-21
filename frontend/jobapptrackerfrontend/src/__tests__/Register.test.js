import { Register, RegisterErrors } from "../models/SignUp/Register";
import { passwordNotInRange, 
    passwordsMismatch,
    emailAddressIsEmpty
} from "../constants/login-constants";

describe('Register tests', () => {
    const login = {
        validUserEmail: "user@email.com",
        validPassword: "validUser23",
        emptyUserEmail: "",
        emptyPassword: "",
        emojiPassword: "Hello World! 🤣"

    };

    const assertErrorsAreEqual = (actual, expected) => {
        expect(actual.getEmailError()).toBe(expected.getEmailError());
        expect(actual.getPasswordError()).toBe(expected.getPasswordError());
        expect(actual.getConfirmPasswordError()).toBe(expected.getConfirmPasswordError());
    }

    describe('getError tests', () => {
        test('when passed in empty values, should return errors for all fields', () => {
            const sut = new Register(login.emptyUserEmail,
                 login.emptyPassword, login.emptyPassword);
            const expectedValue = new RegisterErrors(emailAddressIsEmpty,
                 passwordNotInRange, passwordNotInRange);
            const actualValue = sut.getErrors();

            assertErrorsAreEqual(actualValue, expectedValue);
        });

        test('when passed in valid values, should not return any errors', () => {
            const sut = new Register(login.validUserEmail, login.validPassword,
                login.validPassword);

            const expectedValue = new RegisterErrors("", "", "");
            const actualValue = sut.getErrors();

            assertErrorsAreEqual(actualValue, expectedValue);
        });

        test('when passed in a valid username and an emoji password, should return errors', () => {
            const sut = new Register(login.expectedValue,
                login.emojiPassword, login.emojiPassword);

            const expectedValue = new RegisterErrors("", passwordNotInRange, passwordNotInRange);
            const actualValue = sut.getErrors();

            assertErrorsAreEqual(actualValue, expectedValue);
        });
    });
});