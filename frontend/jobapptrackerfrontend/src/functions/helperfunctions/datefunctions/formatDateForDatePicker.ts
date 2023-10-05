
export const formatDateForDatePicker = (date: Date): string => {
    return removeDoubleQuotes(getNewDateString(getDateString(date), 9));
}

const getNewDateString = (dateString: string, charsToRemove: number): string => {
    const str = dateString.slice(0, -charsToRemove);
    console.log("The string is " + str);
    return dateString.slice(0, -charsToRemove);
}

const removeDoubleQuotes = (input: string): string => {
    return input.replace(/['"]+/g, '');
}

const getDateString = (date: Date): string => {
    return new Date(date).toLocaleDateString(); 
}