import { JobAppListPage } from "../../../components/jobapplist/JobAppListPage";
import { changeState, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement, getElementByText } from "../../helperfunctions/htmlelements/getElement";
import { NavSearchBarTestIds } from "../../../components/navbar/testIds/NavSearchBarTestIds";
import { JobAppListPageTestIds } from "../../../components/jobapplist/JobAppListPageTestIds";
import { assertElementsAreInDocument, assertElementsAreNotInDocument, isHTMLElementNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { renderJSXElementWithRoute } from "../../helperfunctions/setup/uitestsetup";
import { RoutePath } from "../../../enums/RoutePath_enum";
import userEvent from "@testing-library/user-event";
import { LoginFormIds } from "../../../components/login/constants/LoginFormIds";
import { fail } from "assert";
import { getToken, getDateLastChecked, deleteTokenAndDate, saveToken, saveDateLastChecked } from "../../../functions/session/localStorage";
import { createResolvingGetAllJobAppFunc, createResolvingGetNewJobAppFunc } from "../../helperfunctions/types/MockJestGetJobAppFunc_type";
import { validGetNewJobAppResponse, validResponse } from "../../helpervars/jobapppagevars/jobappvars";
import { createMockGetSavedLastDateCheckedFunc, createMockGetTokenFunc, createMockSaveLastDateChecked, createMockSaveToken } from "../../helperfunctions/types/MockLocalStorageFuncs_type";
import { getAllJobApps } from "../../../functions/networkcalls/getAllJobApps";
import { assertMockGetAllJobAppsHasBeenCalledTimes, assertMockGetNewJobAppsHasBeenCalledTimes } from "../../helperfunctions/assertions/jobapplistpageassertions";
import { JobAppCardTestIds } from "../../../enums/jobappcardtestids/JobAppCardTestIds_enum";

describe("JobAppListPage tests", () => {
    const getAllJobAppsPath = "../../../functions/networkcalls/getAllJobApps";
    const getNewJobAppsPath = "../../../functions/networkcalls/getNewJobApps";
    const localStoragePath = "../../../functions/session/localStorage";

    const renderJobAppListPage = () => {
        renderJSXElementWithRoute([RoutePath.jobapplist], <JobAppListPage />);        
    };
    
    describe("Render tests", () => {
        test("Default render", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc("");
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });

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

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
                assertElementsAreNotInDocument(nonPresentIds);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 1);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps);
            });
        });
        test("Render with newJobApps", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc(new Date().toLocaleString());
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });

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

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
                assertElementsAreNotInDocument(nonPresentIds);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps, 1);
            });
        });
    });

    describe("JobAppListPage NavBar tests", () => {
        test("When pressing the dropdown menu, logout button should be present", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc();
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });
            
            renderJobAppListPage();

            const dropdownButton = getElement(NavSearchBarTestIds.navSearchDropDown);

            if (isHTMLElementNull(dropdownButton)) {
                fail("Dropdown shouldn't be null.");
            }

            userEvent.click(dropdownButton!);
            
            waitForChanges(() => {
                assertElementsAreInDocument([NavSearchBarTestIds.logoutButton]);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 1);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps);
            });
        });

        test("When pressing the logout button, should take the user to the login screen", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc();
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });
            
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
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 1);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps);
            });
        });
    });
    describe("Fetch tests", () => {
        const getId = (id: string = "", index: number): string => {
            return `${id}_${index}`;
        };

        const createIds = (maxIndex: number): string[] => {
            let ids: string[] = [];
            for (let i = 0; i < maxIndex; i++) {
                const jobTitleId = getId(JobAppCardTestIds.jobTitle, i);
                const jobCompanyId = getId(JobAppCardTestIds.company, i);
                const statusId = getId(JobAppCardTestIds.status, i);
                const dateApplied = getId(JobAppCardTestIds.dateApplied, i);
                const editButton = getId(JobAppCardTestIds.editButton, i);
                const viewButton = getId(JobAppCardTestIds.viewButton, i);
                const deleteButton = getId(JobAppCardTestIds.deleteButton, i);

                ids.push(jobTitleId, jobCompanyId, statusId, dateApplied,
                    editButton, viewButton, deleteButton);
            }

            console.log("Ids after assigning " + JSON.stringify(ids));

            return ids;
        };

        test("when passing getting all job apps should return 2 cards", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc();
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });
            
            renderJobAppListPage();

            const presentIds = createIds(2);

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 1);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps);
            });
        });
        
        test("when getting new jobApps should return 3 cards", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validGetNewJobAppResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetNewJobApps = createResolvingGetNewJobAppFunc(validResponse);
            jest.mock(getNewJobAppsPath, () => {
                getNewJobApps: mockGetNewJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            const mockGetSavedDate = createMockGetSavedLastDateCheckedFunc(new Date().toLocaleString());
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
                getDateLastChecked: mockGetSavedDate
            });
            
            renderJobAppListPage();

            const presentIds = createIds(3);
            console.log(JSON.stringify(presentIds));

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 0);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps, 1);
            });
        });
    });
});