import { SignUpErrorBuilder } from "../model/builders/SignUpErrorBuilder";
import { SignUpConfirmPassword } from "../model/interfaces/signup/SignUp";
import { SignUpErrors } from "../model/interfaces/signup/SignUpErrors";
import { LoginSignUpConstants } from "../constants/LoginSignUpConstants";
import { areThereEmojis } from "./areThereEmojis";
import { areThereSpaces } from "./areThereSpaces";
import { isInputInRange } from "./isInputInRange";

export const getSignUpErrors = (signUp: SignUpConfirmPassword): SignUpErrors => {
    const emailState = getEmailError(signUp.email);
    const firstnameState = getFirstnameError(signUp.firstname);
    const lastnameState = getLastnameError(signUp.lastname);
    const passwordState = getPasswordErrors(signUp.password, signUp.confirmPassword);
    
    return new SignUpErrorBuilder()
       .setEmailState({
        emailError: emailState.emailError,
        isEmailInErrorState: emailState.isEmailInErrorState
       })
       .setFirstnameState({
        fnameError: firstnameState.firstnameError,
        errorState: firstnameState.isFirstNameInErrorState
       })
       .setLastnameState({
        lnameError: lastnameState.lastnameError,
        errorState: lastnameState.isInErrorState
       })
       .setPasswordState({
        pError: passwordState.passwordError,
        errorState: passwordState.isPasswordInErrorState})
       .setConfirmPasswordState({
        cPError: passwordState.confirmPasswordError,
        errorState: passwordState.isConfirmPasswordInErrorState})
       .build();
}

const getEmailError = (email: string):
 {emailError: string, isEmailInErrorState: boolean} => {
    let emailError: string = "";
    let isEmailInErrorState: boolean = false;

    if (email === "") {
        emailError = LoginSignUpConstants.emailAddressIsEmpty;
        isEmailInErrorState = true;
    } else if (areThereEmojis(email) || areThereSpaces(email)) {
        emailError = LoginSignUpConstants.emailContainsSpecialCharacters;
        isEmailInErrorState = false;
    } 
    return {
        emailError: emailError,
        isEmailInErrorState: isEmailInErrorState
    };
}

const getFirstnameError = (firstname: string):
 {firstnameError: string, isFirstNameInErrorState: boolean} => {
    let firstnameError: string = "";
    let isFirstNameInErrorState: boolean = false;

    if (firstname === "") {
        firstnameError = LoginSignUpConstants.firstnameIsEmpty;
        isFirstNameInErrorState = true;
    }
    return {
        firstnameError: firstnameError,
        isFirstNameInErrorState: isFirstNameInErrorState
    };
}

const getLastnameError = (lastname: string):
 {lastnameError: string, isInErrorState: boolean} => {
    let lastnameError: string = "";
    let isInErrorState: boolean = false;

    if (lastname === "") {
        lastnameError = LoginSignUpConstants.lastnameIsEmpty;
        isInErrorState = true;
    }

    return {
        lastnameError: lastnameError,
        isInErrorState: isInErrorState
    };
}

const getPasswordErrors = (password: string, confirmPassword: string):
 {passwordError: string, isPasswordInErrorState: boolean,
    confirmPasswordError: string, isConfirmPasswordInErrorState: boolean} => {
    let passwordError: string = "";
    let confirmPasswordError: string = "";
    let isPasswordInErrorState: boolean = false;
    let isConfirmPasswordInErrorState: boolean = false;
    const passwordRanges = {
        min: LoginSignUpConstants.minPasswordLength,
        max: LoginSignUpConstants.maxPasswordLength
    };

    if (password === "") {
        passwordError = LoginSignUpConstants.passwordContainsSpecialCharacters;
        isPasswordInErrorState = true;
    }

    if (confirmPassword === "") {
        confirmPasswordError = LoginSignUpConstants.passwordContainsSpecialCharacters;
        isConfirmPasswordInErrorState = true;
    }

    if (!isInputInRange(password, passwordRanges.min, passwordRanges.max)) {
        passwordError = LoginSignUpConstants.passwordContainsSpecialCharacters;
        isPasswordInErrorState = true;
    }

    if (!isInputInRange(confirmPassword, passwordRanges.min, passwordRanges.max)) {
        confirmPasswordError = LoginSignUpConstants.passwordContainsSpecialCharacters;
        isConfirmPasswordInErrorState = true; 
    }

    if (password !== confirmPassword) {
        passwordError = LoginSignUpConstants.passwordsDoNotMatch;
        isPasswordInErrorState = true;
        confirmPasswordError = LoginSignUpConstants.passwordsDoNotMatch;
        isConfirmPasswordInErrorState = true;
    }

    return {
        passwordError: passwordError,
        isPasswordInErrorState: isPasswordInErrorState,
        confirmPasswordError: confirmPasswordError,
        isConfirmPasswordInErrorState: isConfirmPasswordInErrorState
    };

}