import { areThereEmojis } from "../../functions/areThereEmojis";

describe("areThereEmojis tests", () => {
    const emptyInput = "";
    const noEmojiInput = "HelloThereMyNameis";
    const emojiInput = "HelloWorld🤣";
    const noEmojiPunctuationInput = "Hello;World94.+-()*&^%$#@!\'\"<>\\,|_:[]{}";

    test("If input is empty, areThereEmojis should return false", () => {
        const actualValue = areThereEmojis(emptyInput);

        expect(actualValue).toBe(false);
    });

    test("If input doesn't have an emoji, areThereEmojis should return false", () => {
        const actualValue = areThereEmojis(noEmojiInput);

        expect(actualValue).toBe(false);
    });

    test("If input contains an emoji, areThereEmojis should return true", () => {
        const actualValue = areThereEmojis(emojiInput);

        expect(actualValue).toBe(true);
    });

    test("If input contains no emojis but has punctuation, areThereEmojis should return false", () => {
        const actualValue = areThereEmojis(noEmojiPunctuationInput);

        expect(actualValue).toBe(false);
    });
});