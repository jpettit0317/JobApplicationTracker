export interface SignUpErrors {
    readonly emailError: string;
    readonly firstnameError: string;
    readonly lastnameError: string;
    readonly passwordError: string;
    readonly confirmPasswordError: string;

    readonly isEmailInErrorState: boolean;
    readonly isFirstnameInErrorState: boolean;
    readonly isLastnameInErrorState: boolean;
    readonly isPasswordInErrorState: boolean;
    readonly isConfirmPasswordInErrorState: boolean;
}