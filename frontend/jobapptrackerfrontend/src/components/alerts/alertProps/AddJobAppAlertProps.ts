export interface AddJobAppAlertProps {
    alertMessage: string;
    shouldShow: boolean;
    closeButtonPressed: () => void;
    variant: string;
}