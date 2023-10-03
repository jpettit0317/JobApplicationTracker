
export const formatDateForDatePicker = (date: Date): string => {
    return removeDoubleQuotes(getNewDateString(getDateString(date), 7));
}

const getNewDateString = (dateString: string, charsToRemove: number): string => {
    return dateString.slice(0, -charsToRemove);
}

const removeDoubleQuotes = (input: string): string => {
    return input.replace(/['"]+/g, '');
}

const getDateString = (date: Date): string => {
    return JSON.stringify(date); 
}