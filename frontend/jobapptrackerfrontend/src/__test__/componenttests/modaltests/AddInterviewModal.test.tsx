import { render } from "@testing-library/react";
import { JobInterviewCard } from "../../../components/cards/jobinterviewcard/JobInterviewCard";
import { AddInterviewModalProps } from "../../../components/interviewmodal/AddInterviewModalProps";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { createAddInterviewModalProps, errorJobInterview } from "../../helpervars/addinterviewmodalvars/addinterviewmodalvars";
import { changeState, renderJSXElement, renderJSXElementWithRoute, waitForChanges } from "../../helperfunctions/setup/uitestsetup";
import { AddInterviewModal } from "../../../components/interviewmodal/AddInterviewModal";
import { jobInterview } from "../../helpervars/addjobappvars/addjobappvars";
import { v4 as uuidv4 } from "uuid";
import { assertElementsAreInDocument, assertElementsAreNotInDocument } from "../../helperfunctions/assertions/htmlElementAssertions";
import { screen } from "@testing-library/react";
import { dates } from "../../helpervars/addinterviewmodalvars/addinterviewmodalvars";
import { getElement } from "../../helperfunctions/htmlelements/getElement";
import { AddInterviewModalTestIds } from "../../../enums/jobinterviewtestids/AddInterviewModalTestIds_enum";
import userEvent from "@testing-library/user-event";
import {
    TestElement,
    MockOnSubmit,
    MockOnHide,
    hasInputValue,
    assertOnHideHasBeenCalledTimes,
    assertOnSubmitHasBeenCalledTimes,
    TestElementField,
    assertFieldsHaveInputValue
} from "../../helperfunctions/assertions/addjobinterviewmodaleassertions";

describe("AddInterviewModal tests", () => {
    const renderAddInterviewModal = (props: AddInterviewModalProps) => {
        renderJSXElement(<AddInterviewModal 
            size={props.size}
            shouldShow={props.shouldShow}
            id={props.id}
            onSubmit={props.onSubmit}
            onHide={props.onHide}
        />);
    };

    describe("inital load tests", () => {
        test("when initally loaded should have default values", () => {
            const onSubmit = jest.fn((jobInterview: JobInterview) => {});
            const onHide = jest.fn();
            const uuid = uuidv4();

            const addInterviewProps: AddInterviewModalProps = {
                onHide: onHide,
                onSubmit: onSubmit,
                size: "lg",
                shouldShow: true,
                id: uuid
            };

            renderAddInterviewModal(addInterviewProps);

            const jobInterview: JobInterview = {
                jobappid: uuid,
                id: uuidv4(),
                type: "",
                startDate: new Date(),
                endDate: new Date(),
                location: ""
            };
            
            const typeField = getElement(AddInterviewModalTestIds.interviewType);
            const locationField = getElement(AddInterviewModalTestIds.locationField);

            const testElementFields: TestElementField[] = [
                {field: typeField!, value: jobInterview.type},
                {field: locationField!, value: jobInterview.location},
            ];

            waitForChanges(() => {
                assertOnHideHasBeenCalledTimes(onHide, 0);
                assertOnSubmitHasBeenCalledTimes(onSubmit, 0);
                assertFieldsHaveInputValue(testElementFields);
            }); 
        });
    });
    
    describe("Filling in fields tests", () => {
        test("when filling in fields should have value set", () => {
            const onSubmit = jest.fn((jobInterview: JobInterview) => {});
            const onHide = jest.fn();
            const addInterviewProps: AddInterviewModalProps = {
                onHide: onHide,
                onSubmit: onSubmit,
                size: "lg",
                shouldShow: true,
                id: uuidv4()
            };

            renderAddInterviewModal(addInterviewProps);

            const presentTestIds = [
                "addInterviewTypeField",
                "addInterviewLocationField",
                "addInterviewStartDateField",
                "addInterviewEndDateField",
                "addInterviewCancelButton",
                "addInterviewAddInterviewButton"
            ];

            const nonPresentIds = [
                "addInterviewTypeError",
                "addInterviewStartDateError",
                "addInterviewEndDateError"
            ];

            const jobInterview: JobInterview = {
                jobappid: uuidv4(),
                id: uuidv4(),
                type: "Technical",
                startDate: dates[0],
                endDate: dates[1],
                location: "Online"
            };

            const typeField = getElement(AddInterviewModalTestIds.interviewType);
            const locationField = getElement(AddInterviewModalTestIds.locationField);
            const startDateField = getElement(AddInterviewModalTestIds.startDateField);
            const endDateField = getElement(AddInterviewModalTestIds.endDateField);

            changeState(() => {
                userEvent.type(typeField!, jobInterview.type);
                userEvent.type(locationField!, jobInterview.location);
                userEvent.type(startDateField!, jobInterview.startDate.toLocaleString());
                userEvent.type(endDateField!, jobInterview.endDate.toLocaleString());
            });

            const testElementFields: TestElementField[] = [
                {field: typeField!, value: jobInterview.type},
                {field: locationField!, value: jobInterview.location},
                {field: startDateField!, value: jobInterview.startDate.toLocaleString()},
                {field: endDateField!, value: jobInterview.endDate.toLocaleString()}
            ];

            waitForChanges(() => {
                assertElementsAreInDocument(presentTestIds);
                assertElementsAreNotInDocument(nonPresentIds);
                assertOnSubmitHasBeenCalledTimes(onSubmit, 0);
                assertOnHideHasBeenCalledTimes(onHide, 0);
                assertFieldsHaveInputValue(testElementFields);
            });
        });

        test("when pressing hide button should call once", () => {
            const onSubmit = jest.fn((jobInterview: JobInterview) => {});
            let shouldShow = true;
            const onHide = jest.fn(() => { shouldShow = false; });
            const addInterviewProps: AddInterviewModalProps = {
                onHide: onHide,
                onSubmit: onSubmit,
                size: "lg",
                shouldShow: true,
                id: uuidv4()
            };

            const nonPresentTestIds = [
                "addInterviewTypeField",
                "addInterviewLocationField",
                "addInterviewStartDateField",
                "addInterviewEndDateField",
                "addInterviewCancelButton",
                "addInterviewAddInterviewButton",
                "addInterviewTypeError",
                "addInterviewStartDateError",
                "addInterviewEndDateError"
            ];
    
            renderAddInterviewModal(addInterviewProps);
    
            const cancelButton = getElement(AddInterviewModalTestIds.cancelButton);

            changeState(() => {
                userEvent.click(cancelButton!);
            });
    
            waitForChanges(() => {
                assertElementsAreNotInDocument(nonPresentTestIds);
                assertOnSubmitHasBeenCalledTimes(onSubmit, 0);
                assertOnHideHasBeenCalledTimes(onHide, 0);
                expect(shouldShow).toBe(false);
            });
        });
    });
    describe("Error tests", () => {
        test("when type is empty should return errors", () => {
            const onSubmit = jest.fn((jobInterview: JobInterview) => {});
            const onHide = jest.fn();
            const jobInterview = errorJobInterview;
            const addJobAppProps: AddInterviewModalProps = {
                size: "lg",
                shouldShow: true,
                id: uuidv4(),
                onSubmit: onSubmit,
                onHide: onHide
            };
            const presentId = [AddInterviewModalTestIds.interviewTypeError];

            renderAddInterviewModal(addJobAppProps);
            
            const locationField = getElement(AddInterviewModalTestIds.locationField);
            const startDateField = getElement(AddInterviewModalTestIds.startDateField);
            const endDateField = getElement(AddInterviewModalTestIds.endDateField);

            changeState(() => {
                userEvent.type(locationField!, jobInterview.location);
                userEvent.type(startDateField!, jobInterview.startDate.toLocaleString());
                userEvent.type(endDateField!, jobInterview.endDate.toLocaleString());
            });

            waitForChanges(() => {
                assertElementsAreNotInDocument(presentId);
                assertOnHideHasBeenCalledTimes(onHide, 0);
                assertOnSubmitHasBeenCalledTimes(onSubmit, 0);
            });
        });
    });
});