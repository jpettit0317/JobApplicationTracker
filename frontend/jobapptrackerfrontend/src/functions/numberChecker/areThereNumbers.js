
/*
areThereNumbers(input: String) : String

Checks if there are numbers in a string.
Returns true if there are numbers, otherwise returns false
*/
export const areThereNumbers = (input) => {
    if (input === "") {
        return false;
    }
    return /\d/.test(input);
};