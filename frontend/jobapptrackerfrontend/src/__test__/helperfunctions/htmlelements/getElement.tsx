import { screen } from '@testing-library/react';

export const getElement = (id: string): HTMLElement | null  => {
    return screen.queryByTestId(id);
}

export const getElementByText = (title: string): HTMLElement | null => {
    return screen.queryByText(title);
}

export const getAllElementsByText = (title: string): HTMLElement[] => {
    return screen.queryAllByText(title);
}