import { JobAppListPage } from "../../../components/jobapplist/JobAppListPage";
import { changeState, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { getElement, getElementByText } from "../../helperfunctions/htmlelements/getElement";
import { NavSearchBarTestIds } from "../../../components/navbar/testIds/NavSearchBarTestIds";
import { JobAppListPageTestIds } from "../../../components/jobapplist/JobAppListPageTestIds";
import { assertElementIsInDocument, assertElementsAreInDocument, assertElementsAreNotInDocument, isHTMLElementNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { renderJSXElementWithRoute } from "../../helperfunctions/setup/uitestsetup";
import { RoutePath } from "../../../enums/RoutePath_enum";
import userEvent from "@testing-library/user-event";
import { LoginFormIds } from "../../../components/login/constants/LoginFormIds";
import { fail } from "assert";
import { createResolvingGetAllJobAppFunc, createResolvingGetNewJobAppFunc } from "../../helperfunctions/types/MockJestGetJobAppFunc_type";
import { validGetNewJobAppResponse, validResponse } from "../../helpervars/jobapppagevars/jobappvars";
import { createMockGetSavedLastDateCheckedFunc, createMockGetTokenFunc } from "../../helperfunctions/types/MockLocalStorageFuncs_type";
import { assertMockGetAllJobAppsHasBeenCalledTimes, assertMockGetNewJobAppsHasBeenCalledTimes } from "../../helperfunctions/assertions/jobapplistpageassertions";
import { JobAppCardTestIds } from "../../../enums/jobappcardtestids/JobAppCardTestIds_enum";
import { createRejectingDeleteJobApp, createResolvingDeleteJobApp } from "../../helperfunctions/types/MockJestDeleteJobAppFunc_type";
import { DeleteJobAppTestIds } from "../../../enums/DeleteJobAppTestIds_enum";
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { HttpStatusCode } from "axios";

describe("JobAppListPage tests", () => {
    const getAllJobAppsPath = "../../../functions/networkcalls/getAllJobApps";
    const getNewJobAppsPath = "../../../functions/networkcalls/getNewJobApps";
    const localStoragePath = "../../../functions/session/localStorage";
    const deleteJobAppPath = "../../../functions/networkcalls/deleteJobApp"; 
    
    const renderJobAppListPage = () => {
        renderJSXElementWithRoute([RoutePath.jobapplist], <JobAppListPage />);        
    };
    
    const getId = (id: string = "", index: number): string => {
        return `${id}_${index}`;
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

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
                assertMockGetAllJobAppsHasBeenCalledTimes(mockGetAllJobApps, 0);
                assertMockGetNewJobAppsHasBeenCalledTimes(mockGetNewJobApps, 1);
            });
        });
    });
    describe("Delete tests", () => {
        test("when deleting a job app that job app should not be there", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validGetNewJobAppResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
            });

            const mockDeleteJobApp = createResolvingDeleteJobApp();
            jest.mock(deleteJobAppPath, () => {
                deleteJobApp: mockDeleteJobApp
            });

            renderJobAppListPage();

            const deleteButtonId = getId(JobAppCardTestIds.deleteButton, 0);
            let deleteButton: HTMLElement | null = null;
            let deleteButtonAlert: HTMLElement | null = null;

            waitForChanges(() => {
                assertElementsAreInDocument([deleteButtonId])
                deleteButton = getElement(deleteButtonId);
                userEvent.click(deleteButton!);
            })
            
            waitForChanges(() => {
                assertElementIsInDocument(deleteButton);
                deleteButtonAlert = getElement(DeleteJobAppTestIds.deleteButton);
                userEvent.click(deleteButtonAlert!);
            })

            waitForChanges(() => {
                assertElementsAreNotInDocument([deleteButtonId]);
            });
        });

        test("when deleting a job app and error occurs an alert should appear", () => {
            const mockGetAllJobApps = createResolvingGetAllJobAppFunc(validGetNewJobAppResponse);
            jest.mock(getAllJobAppsPath, () => {
                getAllJobApps: mockGetAllJobApps
            });

            const mockGetToken = createMockGetTokenFunc();
            jest.mock(localStoragePath, () => {
                getToken: mockGetToken
            });

            const mockDeleteJobApp = createRejectingDeleteJobApp("Something went wrong!!", HttpResponseErrorType.other, HttpStatusCode.Forbidden); 
            jest.mock(deleteJobAppPath, () => {
                deleteJobApp: mockDeleteJobApp
            });

            renderJobAppListPage();

            const deleteButtonId = getId(JobAppCardTestIds.deleteButton, 0);
            let deleteButton: HTMLElement | null = null;
            let deleteButtonAlert: HTMLElement | null = null;

            waitForChanges(() => {
                assertElementsAreInDocument([deleteButtonId])
                deleteButton = getElement(deleteButtonId);
                userEvent.click(deleteButton!);
            })
            
            waitForChanges(() => {
                assertElementIsInDocument(deleteButton);
                deleteButtonAlert = getElement(DeleteJobAppTestIds.deleteButton);
                userEvent.click(deleteButtonAlert!);
            })

            waitForChanges(() => {
                const deleteAlert = DeleteJobAppTestIds.alert;
                assertElementsAreInDocument([deleteAlert]);
            }); 
        });
    });
});