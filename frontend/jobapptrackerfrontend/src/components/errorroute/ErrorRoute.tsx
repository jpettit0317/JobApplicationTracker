import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorRoute = () => {
    const error = useRouteError() as Error;

    const renderOther = (): JSX.Element => {
        return (
            <div>
                Oops!
            </div>
        );
    }

    const renderWithMessage = (): JSX.Element => {
        return (
            <div>
              <h1>Oops!</h1>
              {(error as Error)?.message ||
              (error as { statusText?: string })?.statusText}
            </div>
        );
    };

    const renderError = (): JSX.Element => {
        if (isRouteErrorResponse(error)) {
            return renderWithMessage();
        } else {
            return renderOther();
        }
    }
    return (
        renderError()
    );
}