import { NavBar } from "../../../components/navbar/NavBar";
import { NavBarProps } from "../../../components/navbar/props/NavBarProps";
import { 
    getElementByText
} from "../../helperfunctions/htmlelements/getElement";
import { 
    assertElementIsInDocument,
    assertElementsAreInDocument
} from "../../helperfunctions/assertions/htmlElementAssertions";
import { render } from "@testing-library/react";
import { NavBarTestIds } from "../../../components/navbar/testIds/NavBarTestIds";

describe("NavBar tests", () => {
    const navBarTitle = "JobAppTracker";

    const defaultProps: NavBarProps = {
        title: navBarTitle
    };

    const renderNavBar = (props: NavBarProps) => {
        render(
            <NavBar title={props.title} /> 
        );
    }

    describe("render tests", () => {
        test("does NavBar render correctly", () => {
            renderNavBar(defaultProps);

            const presentIds: string[] = [
                NavBarTestIds.navBar,
                NavBarTestIds.navBarBrand
            ];
            const title = getElementByText(defaultProps.title);

            assertElementsAreInDocument(presentIds);
            assertElementIsInDocument(title);
        });
    });
});