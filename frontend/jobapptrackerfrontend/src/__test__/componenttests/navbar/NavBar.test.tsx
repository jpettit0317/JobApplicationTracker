import { NavBar } from "../../../components/navbar/NavBar";
import { NavBarProps } from "../../../components/navbar/props/NavBarProps";
import { 
    getAllElementsByText,
    getElement,
    getElementByText
} from "../../helperfunctions/htmlelements/getElement";
import { 
    assertElementIsInDocument,
    assertElementsAreInDocument
} from "../../helperfunctions/assertions/htmlElementAssertions";
import { cleanup, render } from "@testing-library/react";
import { NavBarTestIds } from "../../../components/navbar/testIds/NavBarTestIds";
import { NavSearchBarTestIds } from "../../../components/navbar/testIds/NavSearchBarTestIds";
import { changeState, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import userEvent from "@testing-library/user-event";

describe("NavBar tests", () => {
    afterEach(() => {
        cleanup();
    });

    const navBarTitle = "JobAppTracker";

    const defaultProps: NavBarProps = {
        title: navBarTitle,
        logoutUser: () => {},
        navigateToAddJobApp: () => {},
        shouldShowDropDown: true
    };

    const noDropDownProps: NavBarProps = {
        title: navBarTitle,
        logoutUser: () => {},
        navigateToAddJobApp: () => {}, 
        shouldShowDropDown: false
    };

    const renderNavBar = (props: NavBarProps) => {
        render(
            <NavBar 
                title={props.title}
                logoutUser={props.logoutUser}
                navigateToAddJobApp={props.navigateToAddJobApp}
                shouldShowDropDown={props.shouldShowDropDown}
            /> 
        );
    }

    describe("render tests", () => {
        test("does NavBar without dropdown render correctly", () => {
            renderNavBar(noDropDownProps);

            const presentIds: string[] = [
                NavBarTestIds.navBar,
                NavBarTestIds.navBarBrand
            ];
            const elements = getAllElementsByText(noDropDownProps.title); 

            assertElementsAreInDocument(presentIds);
            expect(elements.length).not.toBe(0);
        });

        test("does NavBar with dropdown render correctly", () => {
            renderNavBar(defaultProps);

            const presentIds: string[] = [
                NavSearchBarTestIds.navSearchBarId,
                NavSearchBarTestIds.navSearchBarBrandId,
                NavSearchBarTestIds.navSearchBarToggle,
                NavSearchBarTestIds.navSearchDropDown
            ];

            const title = getElementByText(defaultProps.title);

            assertElementsAreInDocument(presentIds);
            assertElementIsInDocument(title);
        });
    });
    describe("Dropdown tests", () => {
        renderNavBar(defaultProps);

        const presentIds: string[] = [
            NavSearchBarTestIds.navSearchBarId,
            NavSearchBarTestIds.navSearchBarBrandId,
            NavSearchBarTestIds.navSearchBarToggle,
            NavSearchBarTestIds.navSearchDropDown,
            NavSearchBarTestIds.logoutButton,
            NavSearchBarTestIds.addJobAppButton
        ];

        const dropDown = getElement(NavSearchBarTestIds.navSearchDropDown);

        changeState(() => {
            userEvent.click(dropDown!);
        });

        const title = getElementByText(defaultProps.title);

        waitForChanges(() => {
            assertElementsAreInDocument(presentIds);
            assertElementIsInDocument(title);
        });
    });
});