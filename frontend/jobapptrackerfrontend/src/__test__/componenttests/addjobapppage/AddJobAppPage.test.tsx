import { AddJobAppPage } from "../../../components/addJobApp/AddJobAppPage";
import { RoutePath } from "../../../enums/RoutePath_enum";
import { addJobApp } from "../../../functions/networkcalls/addJobApp";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { changeState, renderJSXElementWithRoute, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { screen } from "@testing-library/react";
import {
    noInterviewJobApp,
    jobAppWithInterview,
    errorJobAppWithInterview,
    createRejectingMockFunction,
    createResolvingMockFunction,
    validHttpResponse,
    invalidHttpResponse,
    jobInterview3,
    jobAppWithInterview2,
    jobInterviewUUID,
    errorJobInterview
} from "../../helpervars/addjobappvars/addjobappvars";
import { areHTMLElementsNull, assertElementIsInDocument, assertElementIsNotInDocument, assertElementsAreInDocument, assertElementsAreNotInDocument, assertHTMLElementsAreNotInDocument, failIfHTMLElementsAreNull } from "../../helperfunctions/assertions/htmlElementAssertions";
import { assertMockAddJobAppHasBeenCalledTimes } from "../../helperfunctions/assertions/addjobappassertions";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { AddJobAppPageTestIds } from "../../../enums/addjobapptestids/AddJobAppPageTestIds_enum";
import userEvent from "@testing-library/user-event";
import { AddInterviewModalTestIds } from "../../../enums/jobinterviewtestids/AddInterviewModalTestIds_enum";
import { get } from "http";
import { JobInterviewCardTestIds } from "../../../enums/jobinterviewtestids/JobInterviewCardTestIds_enum";
import { EditInterviewModalTestIds } from "../../../enums/jobinterviewtestids/EditInterviewModalTestIds_enum";
import { TestElementField, assertFieldsHaveInputValue } from "../../helperfunctions/assertions/addjobinterviewmodaleassertions";
import { AddJobAppAlertTestIds } from "../../../enums/addjobapptestids/AddJobAppAlertTestIds_enum";

describe("AddJobAppPage tests", () => {
    type TestElement = Document | Element | Window | Node;
    const addJobAppPath = "../../../functions/networkcalls/addJobApp";

    const getId = (id: string, index: number): string => {
        return `${id}_${index}`;
    };

    const convertDateToLocaleString = (date: Date): string => {
        return date.toLocaleString();
    }

    const renderJobAppPage = (jobApp: JobApplication | undefined = undefined) => {
        renderJSXElementWithRoute(
            [RoutePath.addJobApp],
            <AddJobAppPage jobApp={jobApp} />
        );
    }
    describe("Inital load tests", () => {
        test("On intial load should have default values", () => {
            renderJobAppPage();

            const mockAddJobApp = createResolvingMockFunction(validHttpResponse);
            jest.mock(addJobAppPath, () => {
                addJobApp: mockAddJobApp
            });

            const presentIds: string[] = [
                "addJobAppPageHeader",
                "addJobAppPageJobTitle",
                "addJobAppPageCompany",
                "addJobAppPageDescription",
                "addJobAppPageStatus",
                "addJobAppPageDateAppliedField",
                "addJobAppPageSubmitJobApp",
                "addJobAppPageAddInterview"
            ];
            const nonPresentIds: string[] = [
                "addJobAppPageJobTitleHelper",
                "addJobAppPageCompanyError",
                "addJobAppPageStatusError",
                "addJobAppPageDateAppliedError",
            ];

            assertElementsAreInDocument(presentIds);
            assertElementsAreNotInDocument(nonPresentIds);
            assertMockAddJobAppHasBeenCalledTimes(mockAddJobApp, 0);
        });
    });
    describe("AddInterview Modal tests", () => {
        test("when adding an interview should have a card display", () => {
            renderJobAppPage(jobAppWithInterview2);

            const addInterviewButton = getElement(AddJobAppPageTestIds.addInterviewButton);
            const interview = jobInterview3; 

            changeState(() => {
                userEvent.click(addInterviewButton!);
            });

            const typeField = getElement(AddInterviewModalTestIds.interviewType);
            const locationField = getElement(AddInterviewModalTestIds.locationField);
            const startDateField = getElement(AddInterviewModalTestIds.startDateField);
            const endDateField = getElement(AddInterviewModalTestIds.endDateField);
            const submitButton = getElement(AddInterviewModalTestIds.addInterviewButton);

            changeState(() => {
                userEvent.type(typeField!, interview.type);
                userEvent.type(locationField!, interview.location);
                userEvent.type(startDateField!, interview.startDate.toLocaleString());
                userEvent.type(endDateField!, interview.endDate.toLocaleString());
                userEvent.click(submitButton!);
            });

            const cardTitle = getElement(getId(JobInterviewCardTestIds.cardTitle, 0));
            const cardLocation = getElement(getId(JobInterviewCardTestIds.locationField, 0));
            const cardStartDate = getElement(getId(JobInterviewCardTestIds.startDateField, 0));
            const cardEndDate = getElement(getId(JobInterviewCardTestIds.endDateField, 0));

            const testElementFields: TestElementField[] = [
                {field: cardTitle!, value: interview.type},
                {field: cardLocation!, value: interview.location},
                {field: cardStartDate!, value: interview.startDate.toLocaleString()},
                {field: cardEndDate!, value: interview.endDate.toLocaleString()}
            ];

            waitForChanges(() => {
                assertFieldsHaveInputValue(testElementFields);
            });
            
        });
        test("when adding an interview that is invalid, a card should not be displayed.", () => {
            renderJobAppPage(noInterviewJobApp);

            const addInterviewButton = getElement(AddJobAppPageTestIds.addInterviewButton);
            const interview = errorJobInterview; 

            changeState(() => {
                userEvent.click(addInterviewButton!);
            });

            const typeField = getElement(AddInterviewModalTestIds.interviewType);
            const locationField = getElement(AddInterviewModalTestIds.locationField);
            const startDateField = getElement(AddInterviewModalTestIds.startDateField);
            const endDateField = getElement(AddInterviewModalTestIds.endDateField);
            const submitButton = getElement(AddInterviewModalTestIds.addInterviewButton);

            changeState(() => {
                userEvent.type(typeField!, interview.type);
                userEvent.type(locationField!, interview.location);
                userEvent.type(startDateField!, interview.startDate.toLocaleString());
                userEvent.type(endDateField!, interview.endDate.toLocaleString());
                userEvent.click(submitButton!);
            });

            const cardTitle = getElement(getId(JobInterviewCardTestIds.cardTitle, 0));
            const cardLocation = getElement(getId(JobInterviewCardTestIds.locationField, 0));
            const cardStartDate = getElement(getId(JobInterviewCardTestIds.startDateField, 0));
            const cardEndDate = getElement(getId(JobInterviewCardTestIds.endDateField, 0));
            
            const cardElements = [
                cardTitle, cardLocation, cardStartDate, cardEndDate
            ];

            const presentAddInterviewModalIds = [
                AddInterviewModalTestIds.startDateError,
                AddInterviewModalTestIds.endDateError
            ];

            waitForChanges(() => {
                assertHTMLElementsAreNotInDocument(cardElements);
                assertElementsAreInDocument(presentAddInterviewModalIds);
            });
        });
    });
    describe("EditInterviewModal tests", () => {
        test("when editing an interview, should change interview", () => {
            renderJobAppPage(jobAppWithInterview2);

            const editInterviewButton = getElement(getId(JobInterviewCardTestIds.editButtion, 0));
            const interview: JobInterview = {
                ...jobInterviewUUID,
                jobappid: jobAppWithInterview2.id 
            };

            changeState(() => {
                userEvent.click(editInterviewButton!);
            });

            const typeField = getElement(EditInterviewModalTestIds.interviewType);
            const locationField = getElement(EditInterviewModalTestIds.locationField);
            const startDateField = getElement(EditInterviewModalTestIds.startDateField);
            const endDateField = getElement(EditInterviewModalTestIds.endDateField);
            const submitButton = getElement(EditInterviewModalTestIds.editInterviewButton);

            changeState(() => {
                userEvent.type(typeField!, interview.type);
                userEvent.type(locationField!, interview.location);
                userEvent.type(startDateField!, interview.startDate.toLocaleString());
                userEvent.type(endDateField!, interview.endDate.toLocaleString());
                userEvent.click(submitButton!);
            });

            const cardTitle = getElement(getId(JobInterviewCardTestIds.cardTitle, 0));
            const cardLocation = getElement(getId(JobInterviewCardTestIds.locationField, 0));
            const cardStartDate = getElement(getId(JobInterviewCardTestIds.startDateField, 0));
            const cardEndDate = getElement(getId(JobInterviewCardTestIds.endDateField, 0));

            const testElementFields: TestElementField[] = [
                {field: cardTitle!, value: interview.type},
                {field: cardLocation!, value: interview.location},
                {field: cardStartDate!, value: interview.startDate.toLocaleString()},
                {field: cardEndDate!, value: interview.endDate.toLocaleString()}
            ];

            waitForChanges(() => {
                assertFieldsHaveInputValue(testElementFields);
            }); 
        });
        test("when editing an interview results in an invalid interview, " 
            + "should have error fields showing on EditInterviewModal", () => {
            renderJobAppPage(jobAppWithInterview);

            const editInterviewButton = getElement(getId(JobInterviewCardTestIds.editButtion, 0));
            const interview = errorJobInterview;

            changeState(() => {
                userEvent.click(editInterviewButton!);
            });

            const typeField = getElement(EditInterviewModalTestIds.interviewType);
            const locationField = getElement(EditInterviewModalTestIds.locationField);
            const startDateField = getElement(EditInterviewModalTestIds.startDateField);
            const endDateField = getElement(EditInterviewModalTestIds.endDateField);
            const submitButton = getElement(EditInterviewModalTestIds.editInterviewButton);

            changeState(() => {
                userEvent.type(typeField!, interview.type);
                userEvent.type(locationField!, interview.location);
                userEvent.type(startDateField!, interview.startDate.toLocaleString());
                userEvent.type(endDateField!, interview.endDate.toLocaleString());
                userEvent.click(submitButton!);
            });

            const presentIds = [
                EditInterviewModalTestIds.startDateError,
                EditInterviewModalTestIds.endDateError,
                EditInterviewModalTestIds.interviewType,
                EditInterviewModalTestIds.locationField,
                EditInterviewModalTestIds.startDateField,
                EditInterviewModalTestIds.endDateField,
                EditInterviewModalTestIds.cancelButton,
                EditInterviewModalTestIds.editInterviewButton
            ];

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
            });
        });
    });
    describe("AddJobAppPage field tests", () => {
        test("when jobInterview is valid addJobApp should be called once", () => {
            const mockAddJobApp = createResolvingMockFunction(validHttpResponse);
            jest.mock(addJobAppPath, () => {
                addJobApp: mockAddJobApp
            });

            renderJobAppPage(jobAppWithInterview2);
            const submitJobAppButton = getElement(AddJobAppPageTestIds.submitJobAppButton);

            changeState(() => {
                userEvent.click(submitJobAppButton!);
            });

            waitForChanges(() => {
                assertMockAddJobAppHasBeenCalledTimes(mockAddJobApp, 1);
            });
        });
        test("when jobInterview is invalid addJobApp should not be called", () => {
            const mockAddJobApp = createResolvingMockFunction(validHttpResponse);
            jest.mock(addJobAppPath, () => {
                addJobApp: mockAddJobApp
            });

            renderJobAppPage(errorJobAppWithInterview);
            const submitJobAppButton = getElement(AddJobAppPageTestIds.submitJobAppButton);

            changeState(() => {
                userEvent.click(submitJobAppButton!);
            });

            const addJobAppAlert = getElement(AddJobAppAlertTestIds.addJobAppAlert);

            waitForChanges(() => {
                assertElementIsInDocument(addJobAppAlert);
                assertMockAddJobAppHasBeenCalledTimes(mockAddJobApp, 0);
            });
        });
    });
});