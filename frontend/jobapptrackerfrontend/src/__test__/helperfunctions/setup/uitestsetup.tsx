import { render, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export const changeState = (fn: () => void) => {
    act(fn);
}

export const waitForChanges = async (fn: () => void) => {
    await waitFor(fn)
}

export const renderJSXElement = (routes: string[] = [],
     element: JSX.Element) => {
        render(
            <MemoryRouter initialEntries={routes}>
                {element}
            </MemoryRouter>
        )
}