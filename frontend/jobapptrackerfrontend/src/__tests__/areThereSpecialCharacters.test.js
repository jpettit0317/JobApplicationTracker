import { areThereSpecialCharacters } from "../functions/specialCharacterChecker/areThereSpecialCharacters";

describe('areThereSpecialCharacters tests', () => {
    it('when passed in an empty string, areThereSpecialCharacters should return false', () => {
        const actual = areThereSpecialCharacters("");

        expect(actual).toBe(false);
    })

    it('when passed in a string with a special character, should return true', () => {
        const inputs = [
            "Hello\"",
            "password'"
        ]

        for (const input of inputs) {
            const actual = areThereSpecialCharacters(input);
            
            expect(actual).toBe(true);
        }
    });

    it('when passed in a string with no specail characters, should return false', () => {
        const inputs = [
            "Hello;",
            "password+=56"
        ]

        for (const input of inputs) {
            const actual = areThereSpecialCharacters(input);

            expect(actual).toBe(false);
        }
    });
});