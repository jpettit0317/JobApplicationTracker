
/*
areThereSpecialCharacters(input: String) : Bool

Returns true if input contains \, otherwise
returns false.
*/
export const areThereSpecialCharacters = (input) => {
    const slash = /[\[\]'"\\|\/]+/;

    return slash.test(input);
}