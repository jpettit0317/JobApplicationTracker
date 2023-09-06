import userEvent from "@testing-library/user-event";

export const typeInTextField = (element: HTMLElement | null, type: string = "") => {
    if (type === "") {
        return;
    } else if (element === null) {
        throw Error("Element is null");
    }
     
    userEvent.type(element!, type);
};