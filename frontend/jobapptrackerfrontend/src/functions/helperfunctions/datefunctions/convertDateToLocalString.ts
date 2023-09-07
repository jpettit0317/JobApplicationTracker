
export const convertDateToLocalString = (date: Date, locale: string = "en-US"): string => {
    return new Date(date.toLocaleString(locale))
        .toLocaleString(locale);
}