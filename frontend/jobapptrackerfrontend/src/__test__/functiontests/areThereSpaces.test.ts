import { areThereSpaces } from "../../functions/areThereSpaces";

describe('areThereSpaces tests', () => {
    const inputWithSpaces = "hello world";
    const inputWithNoSpaces = "helloworld";

    test("when passed in a string with spaces, areThereSpaces should return true", () => {
        const actualValue = areThereSpaces(inputWithSpaces);
        
        expect(actualValue).toBe(true);
    });

    test('when passed in a string without spaces, areThereSpaces should return false', () => {
        const actualValue = areThereSpaces(inputWithNoSpaces);

        expect(actualValue).toBe(false);
    });
});