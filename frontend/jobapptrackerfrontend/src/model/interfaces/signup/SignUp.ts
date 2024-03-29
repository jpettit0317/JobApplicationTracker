export interface SignUp {
    readonly email: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly password: string;   
}

export interface SignUpConfirmPassword extends SignUp {
    readonly confirmPassword: string;
}

export const isSignUpEmpty = (signUp: SignUp): boolean => {
    return signUp.email === "" || signUp.firstname === "" 
        || signUp.lastname === "" || signUp.password === "";
}