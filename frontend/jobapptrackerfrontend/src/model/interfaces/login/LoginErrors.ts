
export interface LoginErrors {
    readonly emailError: string;
    readonly passwordError: string;
    readonly isEmailInErrorState: boolean;
    readonly isPasswordInErrorState: boolean;
}