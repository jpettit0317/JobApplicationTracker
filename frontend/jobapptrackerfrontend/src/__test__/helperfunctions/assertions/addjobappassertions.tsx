import { MockJestAddJobAppFunc } from "../types/MockJestAddJobAppFunc_type";

export const assertMockAddJobAppHasBeenCalledTimes =
 (func: MockJestAddJobAppFunc, timesCalled: number = 0) => {
    expect(func).toBeCalledTimes(timesCalled);
}