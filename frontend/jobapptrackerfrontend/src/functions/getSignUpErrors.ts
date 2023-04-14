import { SignUpErrorBuilder } from "../model/builders/SignUpErrorBuilder";
import { SignUpConfirmPassword } from "../model/interfaces/signup/SignUp";
import { SignUpErrors } from "../model/interfaces/signup/SignUpErrors";

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
    return {
        emailError: "",
        isEmailInErrorState: false
    };
}

const getFirstnameError = (firstname: string):
 {firstnameError: string, isFirstNameInErrorState: boolean} => {
    return {
        firstnameError: "",
        isFirstNameInErrorState: false
    };
}

const getLastnameError = (lastname: string):
 {lastnameError: string, isInErrorState: boolean} => {
    return {
        lastnameError: "",
        isInErrorState: false
    }
}

const getPasswordErrors = (password: string, confirmPassword: string):
 {passwordError: string, isPasswordInErrorState: boolean,
    confirmPasswordError: string, isConfirmPasswordInErrorState: boolean} => {
    return {
        passwordError: "",
        isPasswordInErrorState: false,
        confirmPasswordError: "",
        isConfirmPasswordInErrorState: false
    };

}