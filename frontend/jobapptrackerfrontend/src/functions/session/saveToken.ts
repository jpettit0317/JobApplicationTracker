import { StorageField } from "../../enums/StorageField_enum";

export const saveToken = (token: string) => {
    window.sessionStorage.setItem(StorageField.session, token);
}