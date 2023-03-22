
/*
areThereSpaces(input: String) : Bool

checks if there is a space in input.
*/
export const areThereSpaces = (input) => {
    if (input === "") {
        return false;
    }

    return /\s/.test(input);
}