import { navBarTitle } from "../../constants/NavBarTitle";
import { NavSearchBar } from "../navbar/NavSearchBar";

export const JobAppListPage = () => {
    const onSearchButtonPressed = (searchTerm: string = "") => {
        console.log("The search term is ", searchTerm);
    };

    return (
        <div>
            <NavSearchBar 
                onSearchButtonPressed={onSearchButtonPressed}
                title={navBarTitle}
            />
            <h1 data-testid="jobAppListPageHeader">Job App List</h1>
        </div>
    );
}