import { StorageField } from "../../enums/StorageField_enum"

export const deleteToken = () => {
    window.sessionStorage.removeItem(StorageField.session);
}