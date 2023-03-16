export class Login {
    #email;
    #password;

    constructor(email, password) {
        this.#email = email;
        this.#password = password;
    }

    getErrors() {
        return new LoginErrors("", "");
    }
}

export class LoginErrors {
    #emailError;
    #passwordError;

    constructor(emailError, passwordError) {
        this.#emailError = emailError;
        this.#passwordError = passwordError;
    }
}