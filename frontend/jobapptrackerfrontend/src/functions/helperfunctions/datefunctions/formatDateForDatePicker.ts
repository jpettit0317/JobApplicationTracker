
export const formatDateForDatePicker = (date: Date, locale: string = "en-US"): string => {
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    const date2 = date.toLocaleString(locale);
    const dateFormat = dateFormatter.format(new Date(date2));

    return dateFormat;
}


// const getNewDateString = (dateString: string, charsToRemove: number): string => {
//     const str = dateString.slice(0, -charsToRemove);
//     console.log("The string is " + str);
//     return dateString.slice(0, -charsToRemove);
// }

// const removeDoubleQuotes = (input: string): string => {
//     return input.replace(/['"]+/g, '');
// }

// const getDateString = (date: Date): string => {
//     return new Date(date).toLocaleDateString(); 
// }