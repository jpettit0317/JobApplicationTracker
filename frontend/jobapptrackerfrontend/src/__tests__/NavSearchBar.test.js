import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { NavSearchBar } from "../components/navbar/NavSearchBar";

describe('NavSearchBar UI tests', () => {
    let wasSearchButtonPressed = false;
    let searchTermEntered = "";

    const onSearchButtonPressed = (input) => {
        wasSearchButtonPressed = true;
        searchTermEntered = input;
    };

    const testIds = {
        navBar: "navSearchBar",
        brand: "navSearchBarBrand",
        navBarToggle: "navBarToggle",
        navDropDown: "navDropDown",
        searchForm: "searchForm",
        searchField: "searchField",
        searchButton: "searchButton"
    };

    const resetVars = () => {
        wasSearchButtonPressed = false;
        searchTermEntered = "";
    };

    beforeEach(() => {
        resetVars();
    });

    afterEach(() => {
        resetVars();        
    });

    describe('renders correctly', () => {
        it('when NavSearchBar is rendered, all elements should be loaded', () => {
            render(<NavSearchBar onSearchButtonPressed={onSearchButtonPressed}/>);

            const navSearchBar = screen.queryByTestId(testIds.navBar);
            const brand = screen.queryByTestId(testIds.brand);
            const navBarToogle = screen.queryByTestId(testIds.navBarToggle);
            const navDropDown = screen.queryByTestId(testIds.navDropDown);
            const searchForm = screen.queryByTestId(testIds.searchForm);
            const searchField = screen.queryByTestId(testIds.searchField);
            const searchButton = screen.queryByTestId(testIds.searchButton);

            expect(navSearchBar).toBeInTheDocument();
            expect(brand).toBeInTheDocument();
            expect(navBarToogle).toBeInTheDocument();
            expect(navDropDown).toBeInTheDocument();
            expect(searchForm).toBeInTheDocument();
            expect(searchField).toBeInTheDocument();
            expect(searchButton).toBeInTheDocument();
        });

        it('when a search term is entered, should call onSearchButtonPressed', async () => {
            render(<NavSearchBar onSearchButtonPressed={onSearchButtonPressed} />);
            const searchTerm = "world";

            const searchField = screen.queryByTestId(testIds.searchField);
            const searchButton = screen.queryByTestId(testIds.searchButton);

            act(() => {
                userEvent.type(searchField, searchTerm);

                userEvent.click(searchButton);
            })

            await waitFor(() => {
                expect(searchField).toBeInTheDocument();
                expect(searchButton).toBeInTheDocument(); 
                expect(wasSearchButtonPressed).toBe(true);
                expect(searchTermEntered).toBe(searchTerm);
            });
        });
    });
});