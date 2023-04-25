import { navBarTitle } from "../../constants/NavBarTitle";
import { NavSearchBar } from "../navbar/NavSearchBar";
import { JobAppListPageTestIds } from "./JobAppListPageTestIds";

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
            <h1 data-testid={JobAppListPageTestIds.jobAppListPageHeader}>
                Job App List
            </h1>
        </div>
    );
}