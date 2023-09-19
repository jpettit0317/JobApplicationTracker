import { MockJestJobAppCardFunc } from "../types/MockJestJobAppCardFunc_type";

export const assertMockJobAppCardFuncHasBeenCalledTimes = (func: MockJestJobAppCardFunc, timesCalled: number = 0) => {
    expect(func).toBe(timesCalled);
}