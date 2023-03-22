import { areThereSpaces } from "../functions/spaceChecker/areThereSpaces";

describe('areThereSpaces tests', () => {
    test('when passed in an empty string, areThereSpaces should return false', () => {
        const emptyString = "";

        const actual = areThereSpaces(emptyString);

        expect(actual).toBe(false);
    });

    test('when passed in a string with spaces, areThereSpaces should return true', () => {
        const stringWithSpace = "pass word;";

        const actual = areThereSpaces(stringWithSpace);

        expect(actual).toBe(true);
    });

    test('when passed in a string with no spaces, areThereSpaces should return false', () => {
        const stringWithNoWhitespace = "password";

        const actual = areThereSpaces(stringWithNoWhitespace);

        expect(actual).toBe(false);
    });
});