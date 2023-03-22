import emojiRegex from "emoji-regex";

export const areThereEmojis = (input) => {
    if (input === "") {
        return false;
    }

    const matchArray = convertInputIntoArray(input);

    if (matchArray.length == 0) {
        return false;
    } else {
        return true;
    }
};

const convertInputIntoArray = (input) => {
    const regex = emojiRegex();
    const match = input.matchAll(regex);

    return Array.from(match);
}