import { getElement } from "../htmlelements/getElement";

export const assertElementsAreInDocument = (ids: string[]) => {
    for (let val of ids) {
        const element = getElement(val);
        assertElementIsInDocument(element);
    }
}

export const assertElementsAreNotInDocument = (ids: string[]) => {
    for (let val of ids) {
        const element = getElement(val);
        assertElementIsNotInDocument(element);
    }
}

export const assertElementIsInDocument = (element: HTMLElement | null) => {
    expect(element).toBeInTheDocument();
}

export const assertElementIsNotInDocument = (element: HTMLElement |
    null ) => {
        expect(element).not.toBeInTheDocument();
}

export const areHTMLElementsNull = (elements: (HTMLElement | null) []): boolean => {
    for (let element of elements) {
        if (isHTMLElementNull(element)) {
            return true;
        }
    }
    return false;
}

export const isHTMLElementNull = (element: HTMLElement | null): boolean => {
    return element === null;
}