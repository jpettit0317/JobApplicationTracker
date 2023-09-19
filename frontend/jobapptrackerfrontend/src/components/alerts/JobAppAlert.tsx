import { Alert } from "react-bootstrap";
import { JobAppAlertTestIds } from "../../enums/JobAppAlertTestIds_enum";

export interface JobAppAlertProps {
    alertMessage: string;
    shouldShow: boolean;
    variant: string;
    closeButtonPressed: () => void;
}

export const JobAppAlert = (props: JobAppAlertProps) => {
    const header = "Error";

    return (
        <div>
            { props.shouldShow &&
                <Alert variant={props.variant} onClose={props.closeButtonPressed}
                    data-testid={JobAppAlertTestIds.alertMain}
                    dismissible
                >
                    <Alert.Heading data-testid={JobAppAlertTestIds.alertHeader}>
                        {header}                
                    </Alert.Heading>
                    <p data-testid={JobAppAlertTestIds.alertBody}>
                        {props.alertMessage}
                    </p>
                </Alert>
            }
        </div>
    );
}