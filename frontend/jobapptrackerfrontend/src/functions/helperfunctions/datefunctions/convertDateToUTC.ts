
export const convertDateToUTC = (input: string): Date => {
    const dateString = new Date(input).toUTCString();

    return new Date(dateString);
};