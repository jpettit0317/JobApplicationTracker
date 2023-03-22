import { render, screen } from "@testing-library/react";
import { NavBar } from "../components/navbar/NavBar";

describe('NavBar tests', () => {
    const testIds = {
        navbar: "navbar",
        navbarBrand: "navbarbrand"
    };

    it('renders correctly', () => {
        render(<NavBar />);

        const navBar = screen.getByTestId(testIds.navbar);
        const navBarBrand = screen.getByTestId(testIds.navbarBrand);

        expect(navBar).toBeInTheDocument();
        expect(navBarBrand).toBeInTheDocument();
    });
});