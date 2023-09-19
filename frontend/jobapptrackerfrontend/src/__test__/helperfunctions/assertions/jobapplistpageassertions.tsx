import { MockJestGetAllJobAppFunc, MockJestGetNewJobAppFunc } from "../types/MockJestGetJobAppFunc_type"

export const assertMockGetAllJobAppsHasBeenCalledTimes =
(func: MockJestGetAllJobAppFunc, expectedTimesCalled: number = 0) => {
    expect(func).toBeCalledTimes(expectedTimesCalled);
}

export const assertMockGetNewJobAppsHasBeenCalledTimes =
(func: MockJestGetNewJobAppFunc, expectedTimesCalled: number = 0) => {
    expect(func).toBeCalledTimes(expectedTimesCalled);
}