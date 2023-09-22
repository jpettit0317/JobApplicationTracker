import { ViewJobAppPage } from "../../../components/viewJobApp/ViewJobAppPage";
import { RoutePath } from "../../../enums/RoutePath_enum";
import { AddJobAppPageTestIds } from "../../../enums/addjobapptestids/AddJobAppPageTestIds_enum";
import { formatDateForDatePicker } from "../../../functions/helperfunctions/datefunctions/formatDateForDatePicker";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { TestElementField, assertFieldsHaveInputValue } from "../../helperfunctions/assertions/addjobinterviewmodaleassertions";
import { assertElementsAreInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { renderJSXElementWithRoute, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { createResolvingGetOneJobAppFunc } from "../../helperfunctions/types/MockJestGetJobAppByIdFunc_type";
import { v4 as uuidv4 } from "uuid";

describe("ViewJobAppPage tests", () => {
    const viewJobAppPageRoute = RoutePath.viewJobApp;
    const getOneJobAppPath = "../../../functions/networkcalls/getOneJobApp";

    const id = uuidv4();

    const getDateString = (date: Date): string => {
        return formatDateForDatePicker(date);
    }

    const jobInterview: JobInterview = {
        id: uuidv4(),
        jobappid: id,
        type: "Technical",
        startDate: new Date(),
        endDate: new Date(),
        location: "Online"
    };

    const jobApp: JobApplication = {
        company: "Google",
        jobTitle: "Junior Software Engineer",
        description: "",
        status: "",
        id: uuidv4(),
        dateApplied: new Date(),
        interviews: [jobInterview],
        dateModified: new Date()
    };
    
    const renderViewJobAppPage = (id: string) => {
        const route = `${viewJobAppPageRoute}${id}`;
        renderJSXElementWithRoute([route], <ViewJobAppPage id={id}/>);
    }
    
    const getJobAppCardId = (id: string, index: number): string => {
        return `${id}_${index}`;
    }

    describe("init tests", () => {
        test("all elements should be presnet", () => {
            
            const mockGetOneJobAppById = createResolvingGetOneJobAppFunc(jobApp);
            jest.mock(getOneJobAppPath, () => {
                getOneJobApp: mockGetOneJobAppById
            });

            renderViewJobAppPage(jobApp.id);

            const jobTitle = AddJobAppPageTestIds.jobTitle;
            const company = AddJobAppPageTestIds.companyField;
            const description = AddJobAppPageTestIds.descriptionField;
            const status = AddJobAppPageTestIds.statusField;
            const dateApplied = AddJobAppPageTestIds.dateAppliedField;
            const card = getJobAppCardId(AddJobAppPageTestIds.jobInterviewCard, 0);

            waitForChanges(() => {
                assertElementsAreInDocument([jobTitle, company, description, status, dateApplied, card]);
            });
        });
    });
    describe("Value tests", () => {
        test("fields should have values", () => {
            const mockGetOneJobAppById = createResolvingGetOneJobAppFunc(jobApp);
            jest.mock(getOneJobAppPath, () => {
                getOneJobApp: mockGetOneJobAppById
            });
            
            renderViewJobAppPage(jobApp.id);

            const jobTitle = getElement(AddJobAppPageTestIds.jobTitle);
            const company = getElement(AddJobAppPageTestIds.companyField);
            const description = getElement(AddJobAppPageTestIds.descriptionField);
            const status = getElement(AddJobAppPageTestIds.statusField);
            const dateApplied = getElement(AddJobAppPageTestIds.dateAppliedField);

            const testElementFields: TestElementField[] = [
                {field: jobTitle!, value: jobApp.jobTitle},
                {field: company!, value: jobApp.company},
                {field: description!, value: jobApp.description},
                {field: status!, value: jobApp.description},
                {field: dateApplied!, value: getDateString(jobApp.dateApplied)}
            ];

            waitForChanges(() => {
                assertFieldsHaveInputValue(testElementFields);
            });
        });
    });
});