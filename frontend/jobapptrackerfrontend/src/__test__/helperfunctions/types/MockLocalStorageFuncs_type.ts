import { v4 as uuidv4 } from "uuid";
import { saveDateLastChecked } from "../../../functions/session/localStorage";

export type MockGetTokenFunc = jest.Mock<string, []>;
export type MockGetSavedLastDateCheckedFunc = jest.Mock<string, []>;
export type MockGetSaveToken = jest.Mock<void, [input: string]>;
export type MockSaveDateLastChecked = jest.Mock<void, [date: Date]>;

export const createMockGetTokenFunc = (returnValue: string = uuidv4()): MockGetTokenFunc => {
    return jest.fn((): string => { return returnValue; });
}

export const createMockGetSavedLastDateCheckedFunc = (returnValue: string = new Date().toLocaleString()): MockGetSavedLastDateCheckedFunc => {
    return jest.fn((): string => { return returnValue; });
}

export const createMockSaveToken = (token: string = ""): MockGetSaveToken => {
    return jest.fn((input: string) => {});
}

export const createMockSaveLastDateChecked = (date: Date): MockSaveDateLastChecked => {
    return jest.fn((date: Date) => {});
};