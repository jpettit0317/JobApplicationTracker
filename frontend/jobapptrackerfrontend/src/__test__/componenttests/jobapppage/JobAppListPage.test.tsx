import { JobAppListPage } from "../../../components/jobapplist/JobAppListPage";
import { changeState, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement, getElementByText } from "../../helperfunctions/htmlelements/getElement";
import { render } from "@testing-library/react";
import { NavSearchBarTestIds } from "../../../components/navbar/testIds/NavSearchBarTestIds";
import { JobAppListPageTestIds } from "../../../components/jobapplist/JobAppListPageTestIds";
import { areHTMLElementsNull, assertElementsAreInDocument, assertElementsAreNotInDocument, isHTMLElementNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { renderJSXElementWithRoute } from "../../helperfunctions/setup/uitestsetup";
import { RoutePath } from "../../../enums/RoutePath_enum";
import userEvent from "@testing-library/user-event";
import { LoginFormIds } from "../../../components/login/constants/LoginFormIds";
import { fail } from "assert";

describe("JobAppListPage tests", () => {
    const renderJobAppListPage = () => {
        renderJSXElementWithRoute([RoutePath.jobapplist], <JobAppListPage />);        
    };
    
    describe("Render tests", () => {
        test("Default render", () => {
            renderJobAppListPage();

            const presentIds = [
                JobAppListPageTestIds.jobAppListPageHeader,
                NavSearchBarTestIds.navSearchBarId,
                NavSearchBarTestIds.navSearchBarBrandId,
                NavSearchBarTestIds.navSearchBarToggle,
                NavSearchBarTestIds.navSearchDropDown,
                NavSearchBarTestIds.navSearchForm,
                NavSearchBarTestIds.navSearchField,
                NavSearchBarTestIds.navSearchButton
            ];
            const nonPresentIds = [
                NavSearchBarTestIds.logoutButton
            ];

            assertElementsAreInDocument(presentIds);
            assertElementsAreNotInDocument(nonPresentIds);
        });
    });

    describe("JobAppListPage NavBar tests", () => {
        test("When pressing the dropdown menu, logout button should be present", () => {
            renderJobAppListPage();

            const dropdownButton = getElement(NavSearchBarTestIds.navSearchDropDown);

            if (isHTMLElementNull(dropdownButton)) {
                fail("Dropdown shouldn't be null.");
            }

            userEvent.click(dropdownButton!);
            
            waitForChanges(() => {
                assertElementsAreInDocument([NavSearchBarTestIds.logoutButton]);
            });
        });

        test("When pressing the logout button, should take the user to the login screen", () => {
            renderJobAppListPage();
            
            const dropdownButton = getElement(NavSearchBarTestIds.navSearchDropDown);
            

            const idsInDocument = [
                LoginFormIds.loginHeader,
                LoginFormIds.navBar,
                LoginFormIds.navBarBrand,
                LoginFormIds.floatingEmail,
                LoginFormIds.emailField,
                LoginFormIds.floatingPassword,
                LoginFormIds.passwordField,
                LoginFormIds.signUpLink,
                LoginFormIds.submit
            ];

            if (isHTMLElementNull(dropdownButton)) {
                fail("Dropdown is null.");
            }
            
            changeState(() => {
                userEvent.click(dropdownButton!);
            });
            
            waitForChanges(() => {
                const logoutButton = getElement(NavSearchBarTestIds.logoutButton);
                userEvent.click(logoutButton!);
            });

            waitForChanges(() => {
                assertElementsAreInDocument(idsInDocument);
            });
        });
    });
});