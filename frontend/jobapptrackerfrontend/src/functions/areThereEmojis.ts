import emojiRegex from "emoji-regex"

export const areThereEmojis = (input: string): boolean  => {
    if (input === "") {
        return false;
    }

    const regex = emojiRegex();
    const match = input.matchAll(regex);
    const matchArray = Array.from(match);

    if (matchArray.length === 0) {
        return false;
    } else {
        return true;
    }
}