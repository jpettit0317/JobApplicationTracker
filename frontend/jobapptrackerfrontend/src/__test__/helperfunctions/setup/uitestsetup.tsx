import { waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";

export const changeState = (fn: () => void) => {
    act(fn);
}

export const waitForChanges = async (fn: () => void) => {
    await waitFor(fn)
}