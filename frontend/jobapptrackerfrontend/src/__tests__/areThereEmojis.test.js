import { areThereEmojis } from "../functions/emojiChecker/areThereEmojis";

describe('areThereEmojis tests', () => {
    const input = "Hello World!";
    const emptyInput = "";
    const emojiString = "Hello World! 🤣";

    describe('No emojis tests', () => {
        test('when passed in a string with no emojis, should return false', () => {
            const actualValue = areThereEmojis(input);

            expect(actualValue).toBe(false);
        });

        test('when passed in an empty string, should return false', () => {
            const actualValue = areThereEmojis(emptyInput);

            expect(actualValue).toBe(false);
        });
    });

    describe('Emoji tests', () => {
        test('when passed in a string with an emoji should return true', () => {
            const actualValue = areThereEmojis(emojiString);

            expect(actualValue).toBe(true);
        });
    });
});