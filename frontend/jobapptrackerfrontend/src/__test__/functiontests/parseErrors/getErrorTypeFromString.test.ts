import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { getErrorTypeFromString } from "../../../functions/parseErrors/getErrorTypeFromString";

describe("getErrorTypeFromString tests", () => {
    const assertValuesAreEqual = (values: HttpResponseErrorType[] = []) => {
        const [actual, expected] = values;

        expect(actual).toBe(expected);
    }
    
    test("when passed in valid types " + 
    ", getErrorTypeFromString should return correct error type", () => {
        const testInput: {input: string, error: HttpResponseErrorType}[] = [
            {input: "USER_EXISTS", error: HttpResponseErrorType.userExists},
            {input: "OTHER", error: HttpResponseErrorType.other},
            {input: "NONE", error: HttpResponseErrorType.none}
        ];

        for (const input of testInput) {
            const actualValue = getErrorTypeFromString(input.input);
            const expectedValue = input.error;

            assertValuesAreEqual([actualValue, expectedValue]);
        }
    });

    test("when passed an invalid type " + 
    ", getErrorTypeFromString should return correct other error type", () => {
        const actualValue = getErrorTypeFromString("NANI?");
        const expectedValue = HttpResponseErrorType.other;

        assertValuesAreEqual([actualValue, expectedValue]);
    });
});