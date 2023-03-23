import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../components/loadingspinner/LoadingSpinner";

describe('Loading Spinner tests', () => {
    const testIds = {
        modalShow: "modalShow",
        modalDialog: "modalDialog",
        modalTitle: "modalTitle",
        modalBody: "modalBody",
        spinner: "spinner"
    };

    it('does Loading Spinner render correctly', () => {
        render(<LoadingSpinner />);

        const modalShow = screen.getByTestId(testIds.modalShow);
        const modalDialog = screen.getByTestId(testIds.modalDialog);
        const modalTitle = screen.getByTestId(testIds.modalTitle);
        const modalBody = screen.getByTestId(testIds.modalBody);
        const spinner = screen.getByTestId(testIds.spinner);

        expect(modalShow).toBeInTheDocument();
        expect(modalDialog).toBeInTheDocument();
        expect(modalTitle).toBeInTheDocument();
        expect(modalBody).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});