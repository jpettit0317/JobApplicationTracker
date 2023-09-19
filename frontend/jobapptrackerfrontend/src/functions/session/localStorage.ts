import { StorageField } from "../../enums/StorageField_enum"

export const deleteDateLastChecked = () => {
    window.sessionStorage.removeItem(StorageField.dateLastChecked);
}

export const deleteToken = () => {
    window.sessionStorage.removeItem(StorageField.session);
}

export const getDateLastChecked = (): string => {
    const dateLastChecked = window.sessionStorage.getItem(StorageField.dateLastChecked);

    if (dateLastChecked === null) {
        return "";
    } else {
        return dateLastChecked;
    }
}

export const saveDateLastChecked = (date: Date) => {
    const dateLastChecked = convertDateTOJSONString(date); 

    window.sessionStorage.setItem(StorageField.dateLastChecked, dateLastChecked);
}

export const saveToken = (token: string) => {
    window.sessionStorage.setItem(StorageField.session, token);
}

export const getToken = (): string => {
    const sessionToken = window.sessionStorage.getItem(StorageField.session);

    if (sessionToken === null) {
        return "";
    } else {
        return sessionToken;
    }
}

export const deleteTokenAndDate = () => {
    deleteToken();
    deleteDateLastChecked();
}

const convertDateTOJSONString = (date: Date): string => {
    return JSON.stringify(date);
}