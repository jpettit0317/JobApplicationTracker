import { MockJestLoginFunc } from "../types/MockJestLoginFunc_type";

export const assertMockLoginuserHasBeenCalledTimes = (fun: MockJestLoginFunc,
    timesCalled: number = 0) => {
        expect(fun).toBeCalledTimes(timesCalled);
}