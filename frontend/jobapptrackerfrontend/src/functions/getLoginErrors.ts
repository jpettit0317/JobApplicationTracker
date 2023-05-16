import { Login } from "../model/interfaces/login/Login";
import { LoginSignUpConstants } from "../constants/LoginSignUpConstants";
import { LoginErrors } from "../model/interfaces/login/LoginErrors";
import { areThereEmojis } from "./areThereEmojis";
import { areThereSpaces } from "./areThereSpaces";

export const getLoginErrors = (login: Login): LoginErrors => {
    const emailError = getEmailError(login.email);
    const passwordError = getPasswordError(login.password);

    const isThereAnEmailError = getErrorState(emailError); 
    const isThereAnPasswordError = getErrorState(passwordError);

    return {
        emailError: emailError,
        passwordError: passwordError,
        isEmailInErrorState: isThereAnEmailError,
        isPasswordInErrorState: isThereAnPasswordError
    };
}

const getErrorState = (input: string = ""): boolean => {
    return input === "" ? false : true;
}

const getEmailError = (email: string): string => {
    if (email === "") {
        return LoginSignUpConstants.emailAddressIsEmpty;
    } else if (doesInputContainSpecialCharacters(email)){
        return LoginSignUpConstants.emailContainsSpecialCharacters;
    } else {
        return "";
    }
}

// Special characters are spaces and emojis
const getPasswordError = (password: string): string => {
    if (!isPasswordInRange(password) || doesInputContainSpecialCharacters(password)) {
        return LoginSignUpConstants.passwordContainsSpecialCharacters;
    }
    return "";
}

const isPasswordInRange = (password: string): boolean => {
    const passwordLength = password.length;
    const minLength = 8;
    const maxLength = 20;

    return passwordLength >= minLength 
    && passwordLength <= maxLength;
}

const doesInputContainSpecialCharacters = (password: string): boolean => {
    return areThereEmojis(password) || areThereSpaces(password);
}