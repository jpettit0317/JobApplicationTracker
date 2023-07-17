export interface LoginAlertProps {
    shouldShow: boolean;
    closeButtonPressed: () => void;
    alertMessage: string;
    alertTitle: string;
}