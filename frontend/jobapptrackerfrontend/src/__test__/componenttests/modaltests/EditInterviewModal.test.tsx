import userEvent from "@testing-library/user-event";
import { JobInterviewCard } from "../../../components/cards/jobinterviewcard/JobInterviewCard";
import { EditInterviewModal } from "../../../components/interviewmodal/EditInterviewModal";
import { EditInterviewModalProps } from "../../../components/interviewmodal/EditInterviewModalProps";
import { EditInterviewModalTestIds } from "../../../enums/jobinterviewtestids/EditInterviewModalTestIds_enum";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { ElementIds, TestElementField, assertFieldsHaveInputValue, assertInterviewsAreEqual, assertOnHideHasBeenCalledTimes, assertOnSubmitHasBeenCalledTimes } from "../../helperfunctions/assertions/addjobinterviewmodaleassertions";
import { assertElementIsInDocument, assertElementsAreInDocument, assertElementsAreNotInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { changeState, renderJSXElement, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { createAddInterviewModalProps } from "../../helpervars/addinterviewmodalvars/addinterviewmodalvars";
import { jobInterview } from "../../helpervars/addinterviewmodalvars/addinterviewmodalvars";

describe("EditInterviewModal tests", () => {
    const renderEditInterviewModal = (props: EditInterviewModalProps) => {
        renderJSXElement(
            <EditInterviewModal 
                jobInterview={props.jobInterview}
                size={props.size}
                shouldShow={props.shouldShow}
                onEdit={props.onEdit}
                onHide={props.onHide}
            />
        );        
    };

    describe("EditInterviewModal init", () => {
        test("when initally loaded should have default values", () => {
            const mockOnEdit = jest.fn((jobInterview: JobInterview) => {});
            const mockOnHide = jest.fn();

            const editInterviewProps: EditInterviewModalProps = {
                jobInterview: jobInterview,
                size: "lg",
                shouldShow: true,
                onEdit: mockOnEdit,
                onHide: mockOnHide
            };

            renderEditInterviewModal(editInterviewProps);

            const typeField = getElement(EditInterviewModalTestIds.interviewType);
            const locationField = getElement(EditInterviewModalTestIds.locationField);
            const startDateField = getElement(EditInterviewModalTestIds.startDateField);
            const endDateField = getElement(EditInterviewModalTestIds.endDateField);
            
            const ids: ElementIds = {
                visible: [
                    EditInterviewModalTestIds.interviewType,
                    EditInterviewModalTestIds.locationField,
                    EditInterviewModalTestIds.startDateField,
                    EditInterviewModalTestIds.endDateField,
                    EditInterviewModalTestIds.editInterviewButton,
                    EditInterviewModalTestIds.cancelButton
                ],
                invisible: [
                    EditInterviewModalTestIds.endDateError,
                    EditInterviewModalTestIds.interviewTypeError,
                    EditInterviewModalTestIds.startDateError,
                ]
            };

            const testElementFields: TestElementField[] = [
                {field: typeField!, value: jobInterview.type},
                {field: locationField!, value: jobInterview.location},
                {field: startDateField!, value: jobInterview.startDate.toLocaleString()},
                {field: endDateField!, value: jobInterview.endDate.toLocaleString()}
            ];

            waitForChanges(() => {
                assertElementsAreInDocument(ids.visible);
                assertElementsAreNotInDocument(ids.invisible);
                assertFieldsHaveInputValue(testElementFields);
                assertOnHideHasBeenCalledTimes(mockOnHide, 0);
                assertOnSubmitHasBeenCalledTimes(mockOnEdit, 0);
            })
        });
    });
    describe("EditInterview Modal change tests", () => {
        test("when typing in a job", () => {
            let newJobInterview: JobInterview;
            const behavioralType = "Behavioral";
            const expectedJobInterview = {
                ...jobInterview,
                type: behavioralType
            };

            const mockOnEdit = jest.fn((jobInterview: JobInterview) => {
                newJobInterview = jobInterview;
            });
            const mockOnHide = jest.fn();
            
            const editInterviewProps: EditInterviewModalProps = {
                jobInterview: jobInterview,
                size: "lg",
                shouldShow: true,
                onEdit: mockOnEdit,
                onHide: mockOnHide
            };

            renderEditInterviewModal(editInterviewProps);

            const typeField = getElement(EditInterviewModalTestIds.interviewType);
            const locationField = getElement(EditInterviewModalTestIds.locationField);
            const startDateField = getElement(EditInterviewModalTestIds.startDateField);
            const endDateField = getElement(EditInterviewModalTestIds.endDateField);
            const editInterivewButton = getElement(EditInterviewModalTestIds.editInterviewButton);

            changeState(() => {
                const startDateStr = jobInterview.startDate.toLocaleString();
                const endDateStr = jobInterview.endDate.toLocaleString();

                userEvent.type(typeField!, behavioralType)
                userEvent.type(locationField!, jobInterview.location);
                userEvent.type(startDateField!, startDateStr);
                userEvent.type(endDateField!, endDateStr);
                userEvent.click(editInterivewButton!);
            });

            waitForChanges(() => {
                assertOnSubmitHasBeenCalledTimes(mockOnEdit, 1);
                assertInterviewsAreEqual(newJobInterview, expectedJobInterview);
            });
        });
        test("when interview has no type, should not let user submit interview", () => {
            const errorJobInterview: JobInterview = {
                ...jobInterview,
                type: ""
            };

            const mockOnEdit = jest.fn((jobInterview: JobInterview) => {});
            const mockOnHide = jest.fn();
            
            const editInterviewProps: EditInterviewModalProps = {
                jobInterview: errorJobInterview,
                size: "lg",
                shouldShow: true,
                onEdit: mockOnEdit,
                onHide: mockOnHide
            };

            renderEditInterviewModal(editInterviewProps);

            const locationField = getElement(EditInterviewModalTestIds.locationField);
            const startDateField = getElement(EditInterviewModalTestIds.startDateField);
            const endDateField = getElement(EditInterviewModalTestIds.endDateField);
            const editInterivewButton = getElement(EditInterviewModalTestIds.editInterviewButton);

            changeState(() => {
                const startDateStr = errorJobInterview.startDate.toLocaleString();
                const endDateStr = errorJobInterview.endDate.toLocaleString();

                userEvent.type(locationField!, errorJobInterview.location);
                userEvent.type(startDateField!, startDateStr);
                userEvent.type(endDateField!, endDateStr);
                userEvent.click(editInterivewButton!);
            });

            waitForChanges(() => {
                assertOnSubmitHasBeenCalledTimes(mockOnEdit, 0);
            });
        });
    });
});