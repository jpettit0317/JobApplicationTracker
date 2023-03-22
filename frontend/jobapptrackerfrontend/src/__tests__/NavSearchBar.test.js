import { render, screen } from "@testing-library/react";
import { NavSearchBar } from "../components/navbar/NavSearchBar";

describe('NavSearchBar UI tests', () => {
    const onSearchButtonPressed = (input) => {};

    const testIds = {
        navBar: "navSearchBar",
        brand: "navSearchBarBrand",
        navBarToggle: "navBarToggle",
        navDropDown: "navDropDown",
        searchForm: "searchForm",
        searchField: "searchField",
        searchButton: "searchButton"
    };

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
    });
});