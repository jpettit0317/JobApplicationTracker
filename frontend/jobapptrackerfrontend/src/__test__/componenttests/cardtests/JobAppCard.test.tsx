import { JobAppCardProps } from "../../../components/cards/jobappcard/JobAppCardProps";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { changeState, renderJSXElement, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { JobAppCard } from "../../../components/cards/jobappcard/JobAppCard";
import { jobapp } from "../../helpervars/jobappcardvars/jobappcardvars";
import { getElement, getElementByText } from "../../helperfunctions/htmlelements/getElement";
import { JobAppCardTestIds } from "../../../enums/jobappcardtestids/JobAppCardTestIds_enum";
import userEvent from "@testing-library/user-event";
import { assertMockJobAppCardFuncHasBeenCalledTimes } from "../../helperfunctions/assertions/jobappcardassertions";
import { assertElementIsInDocument, assertElementsAreInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";

describe("JobAppCard tests", () => {
    const renderJobAppCard = (jobAppCardProps: JobAppCardProps) => {
        renderJSXElement(
            <JobAppCard 
                onDelete={jobAppCardProps.onDelete}
                onEdit={jobAppCardProps.onEdit}
                onView={jobAppCardProps.onDelete}
                index={jobAppCardProps.index}
                jobApp={jobAppCardProps.jobApp}
            />
        );
    };

    describe("Initial load tests", () => {
        test("when loaded should have all elements", () => {
            const mockDelete = jest.fn((index: number) => {});
            const mockEdit = jest.fn((index: number) => {});
            const mockView = jest.fn((index: number) => {});
            
            const props: JobAppCardProps = {
                onDelete: mockDelete,
                onEdit: mockEdit,
                onView: mockView,
                index: 0,
                jobApp: jobapp  
            };

            renderJobAppCard(props);

            const editButton = getElement(JobAppCardTestIds.editButton);
            const viewButton = getElement(JobAppCardTestIds.viewButton);
            const deleteButton = getElement(JobAppCardTestIds.deleteButton);
            const cardTitle = getElementByText(jobapp.jobTitle);
            const companyText = getElementByText(jobapp.company);
            const statusText = getElementByText(jobapp.status);
            const dateAppliedText = getElementByText(jobapp.dateApplied.toLocaleString());

            waitForChanges(() => {
                [
                    cardTitle, 
                    companyText,
                    statusText,
                    dateAppliedText,
                    editButton,
                    viewButton,
                    deleteButton
                ].forEach((value) => {
                    assertElementIsInDocument(value);
                });              
            });
        });
    });
});