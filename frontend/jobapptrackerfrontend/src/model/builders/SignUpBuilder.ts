import { timeStamp } from "console";
import { SignUp, SignUpConfirmPassword } from "../interfaces/signup/SignUp";

export class SignUpConfirmPasswordBuilder {
    private email: string = "";
    private firstname: string = "";
    private lastname: string = "";
    private password: string = "";
    private confirmPassword: string = "";

    public setEmail(email: string = ""): SignUpConfirmPasswordBuilder {
        this.email = email;

        return this;
    }

    public setFirstname(firstname: string = ""): SignUpConfirmPasswordBuilder {
        this.firstname = firstname;

        return this;
    }

    public setLastname(lastname: string = ""): SignUpConfirmPasswordBuilder {
        this.lastname = lastname;

        return this;
    }

    public setPassword(password: string = ""): SignUpConfirmPasswordBuilder {
        this.password = password;

        return this;
    }

    public setConfirmPassword(confirmPassword: string = ""): SignUpConfirmPasswordBuilder {
        this.confirmPassword = confirmPassword;

        return this;
    }

    public build(): SignUpConfirmPassword {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        };
    }
}