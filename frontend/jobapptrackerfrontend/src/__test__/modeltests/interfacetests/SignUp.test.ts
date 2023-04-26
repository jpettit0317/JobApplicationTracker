import { SignUp, isSignUpEmpty } from "../../../model/interfaces/signup/SignUp";

describe("Sign Up tests", () => {
    const assertValueToBeTrue = (value: boolean) => {
        expect(value).toBe(true);
    };

    const assertValueToBeFalse = (value: boolean) => {
        expect(value).toBe(false);
    }

    describe("isSignUpEmpty tests", () => {
        test("when sign up is empty, isSignUpEmpty should return true", () => {
            const signUp: SignUp = {
                email: "",
                password: "",
                firstname: "",
                lastname: ""
            };

            const actualValue = isSignUpEmpty(signUp);

            assertValueToBeTrue(actualValue);
        });

        test("when sign up is not empty, isSignUpEmpty should return false", () => {
            const signUp: SignUp = {
                email: "noname@mail.com",
                password: "password94_",
                firstname: "John",
                lastname: "Doe"
            };

            const actualValue = isSignUpEmpty(signUp);

            assertValueToBeFalse(actualValue);
        });
    });
});