import { render } from "@testing-library/react";
import { SignUpPage } from "../../../components/signup/SignUpPage";
import { MemoryRouter } from "react-router";
import { SignUpTestIds } from "../../../components/signup/SignUpTestIds";
import { assertElementsAreInDocument, assertElementsAreNotInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";
import { renderJSXElement } from "../../helperfunctions/setup/uitestsetup";

describe("Sign Up Page tests", () => {
    const signUpRoute = "/signup";
    
    describe("Render tests", () => {
        test("when sign up page is first loaded, there should be no errors" + 
        "or loading indicators", () => {
            renderJSXElement([signUpRoute], <SignUpPage />);

            const presentIds: string[] = [
                SignUpTestIds.signUpHeader,
                SignUpTestIds.floatingEmail,
                SignUpTestIds.emailField,
                SignUpTestIds.floatingFirstname,
                SignUpTestIds.firstNameField,
                SignUpTestIds.floatingLastname,
                SignUpTestIds.lastnameField,
                SignUpTestIds.floatingPassword,
                SignUpTestIds.passwordField,
                SignUpTestIds.floatingConfirmPassowrdField,
                SignUpTestIds.confirmPasswordField,
                SignUpTestIds.loginLink,
                SignUpTestIds.submit,
            ];

            const nonPresentIds: string[] = [
                SignUpTestIds.loadingIndicator,
                SignUpTestIds.emailHelper,
                SignUpTestIds.firstnameHelper,
                SignUpTestIds.lastnameHelper,
                SignUpTestIds.passwordHelper,
                SignUpTestIds.confirmPasswordHelper
            ];

            assertElementsAreInDocument(presentIds);
            assertElementsAreNotInDocument(nonPresentIds);
        });
    });
});