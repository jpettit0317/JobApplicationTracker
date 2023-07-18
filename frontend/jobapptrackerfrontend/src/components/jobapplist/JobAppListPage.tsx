import { useNavigate } from "react-router";
import { navBarTitle } from "../../constants/NavBarTitle";
import { deleteToken } from "../../functions/session/deleteToken";
import { NavSearchBar } from "../navbar/NavSearchBar";
import { JobAppListPageTestIds } from "./JobAppListPageTestIds";
import { RoutePath } from "../../enums/RoutePath_enum";

export const JobAppListPage = () => {
    const navigate = useNavigate();

    const onSearchButtonPressed = (searchTerm: string = "") => {
        console.log("The search term is ", searchTerm);
    };

    const logUserOut = () => {
        deleteToken();
        navigate(RoutePath.login);        
    }

    return (
        <div>
            <NavSearchBar 
                onSearchButtonPressed={onSearchButtonPressed}
                title={navBarTitle}
                logoutUser={logUserOut}
            />
            <h1 data-testid={JobAppListPageTestIds.jobAppListPageHeader}>
                Job App List
            </h1>
        </div>
    );
}