
/*
areThereLetters(input: String): Bool

Returns true when a string contains letters, otherwise
returns false
*/
export const areThereLetters = (input) => {
    if (input === "") {
        return false;
    }
    
    const regExp = /[a-zA-Z]/g;
    return regExp.test(input);
}