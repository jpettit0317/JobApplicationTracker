import { areThereNumbers } from "../functions/numberChecker/areThereNumbers";

describe('areThereNumber tests', () => {
    it('when passed in an empty string, areThereNumbers should return false', () => {
        const emptyString = "";

        const actual = areThereNumbers(emptyString);

        expect(actual).toBe(false);
    });

    it('when passed in a string with no numbers, areThereNumbers should return false', () => {
        const password = "password";

        const actual = areThereNumbers(password);

        expect(actual).toBe(false);
    });

    it('when passed in a string with numbers, areThereNumbers should return true', () => {
        const num = "pass9Word";

        const actual = areThereNumbers(num);

        expect(actual).toBe(true);
    });
});