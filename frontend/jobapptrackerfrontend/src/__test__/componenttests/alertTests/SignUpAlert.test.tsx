import { renderJSXElement } from "../../helperfunctions/setup/uitestsetup";
import { SignUpAlert } from "../../../components/alerts/SignUpAlert";
import { SignUpAlertTestIds } from "../../../enums/SignUpAlertTestIds_enum";
import { assertElementsAreInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";

describe("SignUpAlert tests", () => {
    const renderSignUpAlert = (alertMessage: string = "", shouldShow: boolean = false, closeButtonPressed: () => void) => {
        renderJSXElement(
            <SignUpAlert alertMessage={alertMessage}
                shouldShow={shouldShow}
                closeButtonPressed={closeButtonPressed}
            />
        );
    }
    describe("SignUpAlert intial render tests", () => {
        test("does SignUpAlert render correctly", () => {
            renderSignUpAlert("Hello World", true, () => {}); 

            const testIds: string[] = [
                SignUpAlertTestIds.signUpAlert,
                SignUpAlertTestIds.signUpAlertHeading
            ];

            assertElementsAreInDocument(testIds);
        });
    });
});