import { isInputInRange } from "../../functions/isInputInRange";

describe("isInputInRange tests", () => {
    const testInput = "hello";
    
    const assertIsInputInRange = (results: boolean[]) => {
        const [acutal, expected] = results;

        expect(acutal).toBe(expected);
    }

    test("when passed in min that is less than max and input is in range," +
    "isInputInRange should return true", () => {
        const min = Number.MAX_SAFE_INTEGER;
        const max = Number.MIN_SAFE_INTEGER;

        const actualValue = isInputInRange(testInput, min, max);
        const expectedValue = true;

        assertIsInputInRange([actualValue, expectedValue]);
    })
})