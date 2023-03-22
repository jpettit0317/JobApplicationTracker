import { areThereLetters } from "../functions/letterChecker/areThereLetters";

describe('areThereLetters tests', () => {
    it('when passed in an empty string, areThereLetters should return false', () => {
        const input = "";

        const actual = areThereLetters(input);

        expect(actual).toBe(false);
    });
    
    it('when passed in a string with no letters, areThereLetters should return false', () => {
        const input = "100";

        const actual = areThereLetters(input);

        expect(actual).toBe(false);
    });

    it('when passed in a string with letters, areThereLetters should return true', () => {
        const input = "password94;";

        const actual = areThereLetters(input);

        expect(actual).toBe(true);
    });
});