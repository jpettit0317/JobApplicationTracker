import { screen } from "@testing-library/react";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";

export type TestElement = Document | Element | Window | Node;
export type MockOnSubmit = jest.Mock<void, [jobInterview: JobInterview]>
export type MockOnHide = jest.Mock<any, any>;
export type TestElementField = {field: TestElement, value: string};
export type ElementIds = {visible: string[], invisible: string[]};

export const assertFieldsHaveInputValue = (values: TestElementField[]) => {
    values.forEach(value => {
        hasInputValue(value.field, value.value);
    });
}

export const hasInputValue = (e: TestElement, inputValue: string = ""): boolean => {
    return screen.getByDisplayValue(inputValue) === e;
};

export const assertOnSubmitHasBeenCalledTimes = (func: MockOnSubmit, timesCalled: number = 0) => {
    expect(func).toBeCalledTimes(timesCalled);
}

export const assertOnHideHasBeenCalledTimes = (func: MockOnHide, timesCalled: number = 0) => {
    expect(func).toBeCalledTimes(timesCalled);
};

export const assertInterviewsAreEqual = (actual: JobInterview, expected: JobInterview) => {
    expect(actual.startDate).toBe(expected.startDate);
    expect(actual.endDate).toBe(expected.endDate);
    expect(actual.type).toBe(expected.type);
    expect(actual.location).toBe(expected.location);
}