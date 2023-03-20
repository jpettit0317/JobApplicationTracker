import { passwordNotInRange, emailAddressIsEmpty } from "../../constants/login-constants";

export class Login {
    #email;
    #password;

    constructor(email, password) {
        this.#email = email;
        this.#password = password;
    }

    getErrors() {
        let emailError = "";
        let passwordError = "";

        emailError = this.getEmailError();
        passwordError = this.getPasswordError();

        return new LoginErrors(emailError, passwordError);
    }

    getEmailError() {
        if (this.#email === "") {
            return emailAddressIsEmpty;
        } else {
            return "";
        }
    }

    getPasswordError() {
        if (!this.isPasswordWithinValidRange()) {
            return passwordNotInRange;
        } else {
            return "";
        }
    }

    isPasswordWithinValidRange() {
        const passwordLength = this.#password.length;
        const minLength = 8;
        const maxLength = 20;

        return passwordLength >= minLength 
        && passwordLength <= maxLength; 
    }

    doesPasswordContainSpecialCharacters() {
        
    }
}

export class LoginErrors {
    #emailError;
    #passwordError;

    constructor(emailError, passwordError) {
        this.#emailError = emailError;
        this.#passwordError = passwordError;
    }

    getEmailError() {
        return this.#emailError;
    }

    getPasswordError() {
        return this.#passwordError;
    }
}