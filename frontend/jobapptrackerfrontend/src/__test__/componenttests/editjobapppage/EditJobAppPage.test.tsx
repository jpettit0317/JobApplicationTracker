import { EditJobAppPage } from "../../../components/editjobApp/EditJobAppPage";
import { RoutePath } from "../../../enums/RoutePath_enum";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { changeState, renderJSXElementWithRoute, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { v4 as uuidv4 } from "uuid";
import { createResolvingGetOneJobAppFunc } from "../../helperfunctions/types/MockJestGetJobAppByIdFunc_type";
import { assertElementsAreInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";
import { EditJobAppPageTestIds } from "../../../enums/editjobapptestids/EditJobAppTestids_enum";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { AddInterviewModalTestIds } from "../../../enums/jobinterviewtestids/AddInterviewModalTestIds_enum";
import userEvent from "@testing-library/user-event";
import { typeInTextField } from "../../helperfunctions/htmlelements/typeInTextField";
import { createResolvingEditJobApp } from "../../helperfunctions/types/MockEditJobAppFunc_type";
import { JobAppListPageTestIds } from "../../../components/jobapplist/JobAppListPageTestIds";
import { JobInterviewCardTestIds } from "../../../enums/jobinterviewtestids/JobInterviewCardTestIds_enum";

describe("EditJobAppPage tests", () => {
    const getOneJobAppPath = "../../../functions/networkcalls/getOneJobApp"; 
    const editJobAppPath = "../../../functions/networkcalls/editJobApp";
    const editPageRoute = RoutePath.editJobApp;

    const id = uuidv4();

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
        id: id,
        dateApplied: new Date(),
        interviews: [jobInterview],
        dateModified: new Date()
    };

    const getId = (id: string, index: number): string => {
        return `${id}_${index}`;
    };

    const renderEditJobAppPage = (id: string) => {
        const route = `${editPageRoute}${id}`;
        renderJSXElementWithRoute([route], <EditJobAppPage />)
    };

    describe("inital load tests", () => {
        test("On initial load should have default values", () => {
            const mockGetOneJobAppById = createResolvingGetOneJobAppFunc(jobApp);
            jest.mock(getOneJobAppPath, () => {
                getOneJobApp: mockGetOneJobAppById
            });

            renderEditJobAppPage(jobApp.id);

            const presentIds = [
                EditJobAppPageTestIds.jobTitle,
                EditJobAppPageTestIds.companyField,
                EditJobAppPageTestIds.descriptionField,
                EditJobAppPageTestIds.statusField,
                EditJobAppPageTestIds.dateAppliedField,
                getId(EditJobAppPageTestIds.jobInterviewCard, 0),
                EditJobAppPageTestIds.oldDateApplied
            ];

            waitForChanges(() => {
                assertElementsAreInDocument(presentIds);
            });
        });
    });
    describe("Edit tests", () => {
        test("Adding an interview should be right", () => {
            const uuidJobInterview: JobInterview = {
                id: uuidv4(),
                jobappid: id,
                type: uuidv4(),
                startDate: new Date(),
                endDate: new Date(),
                location: uuidv4() 
            };
            const mockGetOneJobAppById = createResolvingGetOneJobAppFunc(jobApp);
            jest.mock(getOneJobAppPath, () => {
                getOneJobApp: mockGetOneJobAppById
            });
            const mockEditJobApp = createResolvingEditJobApp();
            jest.mock(editJobAppPath, () => {
                editJobApp: mockEditJobApp
            });
            
            renderEditJobAppPage(jobApp.id);

            const addInterviewButton = getElement(EditJobAppPageTestIds.addInterviewButton);
            const submitEditInterviewButton = getElement(EditJobAppPageTestIds.submitJobAppButton);

            changeState(() => {
                userEvent.click(addInterviewButton!);
            });

            const typeField = getElement(AddInterviewModalTestIds.interviewType);
            const locationField = getElement(AddInterviewModalTestIds.locationField);
            const startDateField = getElement(AddInterviewModalTestIds.startDateField);
            const endDateField = getElement(AddInterviewModalTestIds.endDateField);
            const submitButton = getElement(AddInterviewModalTestIds.addInterviewButton);
            
            changeState(() => {
                typeInTextField(typeField, uuidJobInterview.type);
                typeInTextField(locationField, uuidJobInterview.location);
                typeInTextField(startDateField, uuidJobInterview.startDate.toLocaleString());
                typeInTextField(endDateField, uuidJobInterview.endDate.toLocaleString());
                userEvent.click(submitButton!);
            });

            changeState(() => {
                userEvent.click(submitEditInterviewButton!);
            });

            waitForChanges(() => {
                assertElementsAreInDocument([JobAppListPageTestIds.jobAppListPageHeader]);
            })
        });
    });
});