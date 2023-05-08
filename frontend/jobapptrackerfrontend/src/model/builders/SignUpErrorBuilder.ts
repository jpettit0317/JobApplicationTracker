import { SignUpErrors } from "../interfaces/signup/SignUpErrors";

export class SignUpErrorBuilder {
    private emailError: string = "";
    private firstnameError: string = "";
    private lastnameError: string = "";
    private passwordError: string = "";
    private confirmPasswordError: string = "";

    private isEmailInErrorState: boolean = false;
    private isFirstNameInErrorState: boolean = false;
    private isLastNameInErrorState: boolean = false;
    private isPasswordInErrorState: boolean = false;
    private isConfirmPasswordInErrorState: boolean = false;

    public setEmailState(state: {emailError: string, isEmailInErrorState: boolean}): SignUpErrorBuilder {
        this.emailError = state.emailError;
        this.isEmailInErrorState = state.isEmailInErrorState;

        return this;
    }

    public setFirstnameState(state: {fnameError: string, errorState: boolean}): SignUpErrorBuilder {
        this.firstnameError = state.fnameError;
        this.isFirstNameInErrorState = state.errorState;

        return this;
    }

    public setLastnameState(state: {lnameError: string, errorState: boolean}): SignUpErrorBuilder {
        this.lastnameError = state.lnameError;
        this.isLastNameInErrorState = state.errorState;

        return this;
    }

    public setPasswordState(state: {pError: string, errorState: boolean}): SignUpErrorBuilder {
        this.passwordError = state.pError;
        this.isPasswordInErrorState = state.errorState;

        return this;
    }

    public setConfirmPasswordState(state: {cPError: string, errorState: boolean}): SignUpErrorBuilder {
        this.confirmPasswordError = state.cPError;
        this.isConfirmPasswordInErrorState = state.errorState;

        return this;
    }

    public build(): SignUpErrors {
        return {
            emailError: this.emailError,
            firstnameError: this.firstnameError,
            lastnameError: this.lastnameError,
            passwordError: this.passwordError,
            confirmPasswordError: this.confirmPasswordError,
            isEmailInErrorState: this.isEmailInErrorState,
            isFirstnameInErrorState: this.isFirstNameInErrorState,
            isLastnameInErrorState: this.isLastNameInErrorState,
            isPasswordInErrorState: this.isPasswordInErrorState,
            isConfirmPasswordInErrorState: this.isConfirmPasswordInErrorState
        };
    }

}