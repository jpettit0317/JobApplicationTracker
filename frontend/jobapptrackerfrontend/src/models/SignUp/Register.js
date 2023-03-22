import { passwordNotInRange, emailAddressIsEmpty, passwordsMismatch } from "../../constants/usersignlogin-constants";
import { areThereEmojis } from "../../functions/emojiChecker/areThereEmojis";
import { areThereLetters } from "../../functions/letterChecker/areThereLetters";
import { areThereNumbers } from "../../functions/numberChecker/areThereNumbers";
import { areThereSpaces } from "../../functions/spaceChecker/areThereSpaces";
import { areThereSpecialCharacters } from "../../functions/specialCharacterChecker/areThereSpecialCharacters";

export class Register {
    #email;
    #password;
    #confirmPassword;

    constructor(email, password, confirmPassword) {
        this.#confirmPassword = confirmPassword;
        this.#email = email;
        this.#password = password;
    }

    getEmail() {
        return this.#email;
    }

    getPassword() {
        return this.#password;
    }

    getConfirmPassword() {
        return this.#confirmPassword;
    }

    getErrors() {
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        emailError = this.getEmailError();
        passwordError = this.getPasswordError();
        confirmPasswordError = this.getConfirmPasswordError();

        return new RegisterErrors(emailError, passwordError, confirmPasswordError);
    }

    getEmailError() {
        if (this.#email === "") {
            return emailAddressIsEmpty;
        }
        return "";
    }

    getPasswordError() {
        if (this.doesPasswordHaveFormatErrors(this.#password)) {
            return passwordNotInRange;
        } else if (!this.arePasswordsEqual()) {
            return passwordsMismatch;
        } else {
            return "";
        }
    }

    getConfirmPasswordError() {
        if (this.doesPasswordHaveFormatErrors(this.#confirmPassword)) {
            return passwordNotInRange;
        } else if (!this.arePasswordsEqual()) {
            return passwordsMismatch;
        } else {
            return "";
        }
    }

    areTherePasswordErrors(input) {
        if (this.doesPasswordHaveFormatErrors(input)) {
            return passwordNotInRange;
        } else {
            return "";
        }
    }

    doesPasswordHaveFormatErrors(input) {
        if (!this.isPasswordWithinValidRange(input)) {
            return true;
        } else if (this.areThereEmojis(input)) {
            return true;
        } else if (this.isThereSpaces(input)) {
            return true;
        } else if (!this.areThereNumbers(input)) {
            return true;
        } else if (!this.areThereLetters(input)) {
            return true;
        } else if (this.areThereSpecialCharacters(input)) {
            return true;
        } else {
            return false;
        }
    }

    isPasswordWithinValidRange(password) {
        const passwordLength = password.length;
        const minLength = 8;
        const maxLength = 20;

        return passwordLength >= minLength 
        && passwordLength <= maxLength; 
    }

    arePasswordsEqual() {
        return this.#confirmPassword === this.#password;
    }

    areThereEmojis(input) {
        return areThereEmojis(input);
    }

    isThereSpaces(input) {
        return areThereSpaces(input);
    }

    areThereNumbers(input) {
        return areThereNumbers(input);
    }

    areThereLetters(input) {
        return areThereLetters(input);
    }

    areThereSpecialCharacters(input) {
        return areThereSpecialCharacters(input);
    }
}

export class RegisterErrors {
    #emailError;
    #passwordError;
    #confirmPasswordError;

    constructor(email, password, confirmPassword) {
        this.#confirmPasswordError = confirmPassword;
        this.#emailError = email;
        this.#passwordError = password;
    }

    getEmailError() {
        return this.#emailError;
    }

    getPasswordError() {
        return this.#passwordError;
    }

    getConfirmPasswordError() {
        return this.#confirmPasswordError;
    }
}
