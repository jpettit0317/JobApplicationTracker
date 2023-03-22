import { Login, LoginErrors } from "../models/Login/Login";
import { passwordNotInRange, emailAddressIsEmpty } from "../constants/usersignlogin-constants";

describe('Login Tests', function () {
  const emptyEmail = "";
  const emptyPassword = "";
  const tooLongPassword = "1234567890123456789012345";
  const validPassword = "javascript64;"
  const validEmail = "jobapptracker@gmail.com";

  const assertErrorsAreEqual = (actualError, expectedError) => {
    expect(actualError.getEmailError()).toBe(expectedError.getEmailError());
    expect(actualError.getPasswordError()).toBe(expectedError.getPasswordError());
  };

  describe('getError tests', () => {
    test('when passed in empty password and empty username, should return error messages for both', () => {
      const sut = new Login(emptyEmail, emptyPassword);

      const actualResult = sut.getErrors();
      const expectedResult = new LoginErrors(emailAddressIsEmpty, passwordNotInRange);

      assertErrorsAreEqual(actualResult, expectedResult);
    });

    test('when passed in valid password and valid username, should return no error messages', () => {
      const sut = new Login(validEmail, validPassword);

      const actualResult = sut.getErrors();
      const expectedResult = new LoginErrors("", "");

      assertErrorsAreEqual(actualResult, expectedResult);
    });

    test('when passed in password that is too long and username that is correct should return no username eror and a password error', () => {
      const sut = new Login(validEmail, tooLongPassword);

      const actualResult = sut.getErrors();
      const expectedResult = new LoginErrors("", passwordNotInRange);

      assertErrorsAreEqual(actualResult, expectedResult); 
    });
  });
});
