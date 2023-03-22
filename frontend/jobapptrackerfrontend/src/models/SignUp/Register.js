import { passwordNotInRange, emailAddressIsEmpty, passwordsMismatch } from "../../constants/login-constants";
import { areThereEmojis } from "../../functions/emojiChecker/areThereEmojis";
import { areThereLetters } from "../../functions/letterChecker/areThereLetters";
import { areThereNumbers } from "../../functions/numberChecker/areThereNumbers";
import { areThereSpaces } from "../../functions/spaceChecker/areThereSpaces";

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
        if (!this.isPasswordWithinValidRange(this.#password) ||
            this.areThereEmojis(this.#password) ||
             this.isThereSpaces(this.#password) ||
             !this.areThereNumbers(this.#password) ||
             !this.areThereLetters(this.#password)) {
            return passwordNotInRange;
        } 
        return "";
    }

    getConfirmPasswordError() {
        if (!this.isPasswordWithinValidRange(this.#confirmPassword)
        || this.areThereEmojis(this.#confirmPassword) ||
         this.isThereSpaces(this.#confirmPassword) ||
          !this.areThereNumbers(this.#confirmPassword) ||
          !this.areThereLetters(this.#confirmPassword)) {
            return passwordNotInRange;
        } 
        
        if (!this.arePasswordsEqual()) {
            return passwordsMismatch;
        }

        return "";
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
