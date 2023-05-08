import { StorageField } from "../../enums/StorageField_enum";

export const getToken = (): string => {
    const sessionToken = window.sessionStorage.getItem(StorageField.session);

    if (sessionToken === null) {
        return "";
    } else {
        return sessionToken;
    }
}