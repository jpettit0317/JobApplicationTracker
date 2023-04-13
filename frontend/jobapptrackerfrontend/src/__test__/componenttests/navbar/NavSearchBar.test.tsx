import { render, screen } from "@testing-library/react";
import { NavSearchBar } from "../../../components/navbar/NavSearchBar";
import { NavSearchBarProps } from "../../../components/navbar/props/NavSearchBarProps";
import { NavSearchBarTestIds } from "../../../components/navbar/testIds/NavSearchBarTestIds";
import { areHTMLElementsNull, assertElementsAreInDocument, isHTMLElementNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { changeState, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement, getElementByText } from "../../helperfunctions/htmlelements/getElement";
import userEvent from "@testing-library/user-event";
import { assertElementIsInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";

describe("NavSearchBar tests", () => {
    let searchTerm: string = "";

    const mockOnSearchButtonPressed = jest.fn((newSearchTerm: string) => {
        searchTerm = newSearchTerm;
    });

    const renderNavSearchBar = (props: NavSearchBarProps) => {
        render(
            <NavSearchBar
            title={props.title}
            onSearchButtonPressed={props.onSearchButtonPressed}
            />
        );
    }

    const resetValues = () => {
        searchTerm = "";
    }

    const props: NavSearchBarProps = {
        title: "JobAppTracker",
        onSearchButtonPressed: mockOnSearchButtonPressed
    };

    beforeEach(() => {
        resetValues();
    });

    afterEach(() => {
        resetValues();
    });

    const assertResults = (expectedSearchTerm: string, timesCalled: number = 0,
         mockFn: jest.Mock<void, [newSearchTerm: string]>) => {
            expect(searchTerm).toBe(expectedSearchTerm);
            expect(mockFn).toHaveBeenCalledWith(searchTerm);
            expect(mockFn).toHaveBeenCalledTimes(timesCalled);
    }

    describe("Render tests", () => {
        test('should render correctly', () => {
            renderNavSearchBar(props);

            const presentTestIds: string[] = [
                NavSearchBarTestIds.navSearchBarId,
                NavSearchBarTestIds.navSearchBarBrandId,
                NavSearchBarTestIds.navSearchBarToggle,
                NavSearchBarTestIds.navSearchDropDown,
                NavSearchBarTestIds.navSearchForm,
                NavSearchBarTestIds.navSearchField,
                NavSearchBarTestIds.navSearchButton
            ];
            const screenTitle = getElementByText(props.title);
            
            assertElementsAreInDocument(presentTestIds);
            assertElementIsInDocument(screenTitle);
        });

        test("when there is no search term in search box" 
        + "and search button is pressed,"
        + "then search term should be empty", () => {
            renderNavSearchBar(props);
            const searchButton = getElement(NavSearchBarTestIds.navSearchButton);

            if (isHTMLElementNull(searchButton)) {
                fail("Search Button is null");
            }

            changeState(() => {
                userEvent.click(searchButton!);
            });

            waitForChanges(() => {
                assertResults("", 1, mockOnSearchButtonPressed);
            });
        });

        test("when there is a search term entered and search button is pressed, " + 
        "then search term should have what was entered", () => {
            renderNavSearchBar(props);

            const searchButton = getElement(NavSearchBarTestIds.navSearchButton);
            const searchField = getElement(NavSearchBarTestIds.navSearchField);
            const input = "Hello World!";

            if (areHTMLElementsNull([searchButton, searchField])) {
                fail("Search field or Search button is null");
            }

            changeState(() => {
                userEvent.type(searchField!, input);
                userEvent.click(searchField!);
            });

            waitForChanges(() => {
                assertResults(input, 1, mockOnSearchButtonPressed); 
            });
        });
    });
});