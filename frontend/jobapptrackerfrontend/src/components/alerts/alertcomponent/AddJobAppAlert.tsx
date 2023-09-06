import { Alert } from "react-bootstrap";
import { AddJobAppAlertProps } from "../alertProps/AddJobAppAlertProps";
import { AddJobAppAlertTestIds } from "../../../enums/addjobapptestids/AddJobAppAlertTestIds_enum";

export const AddJobAppAlert = (props: AddJobAppAlertProps) => {
    const alertMessage = props.alertMessage;
    const header = "Error"
    return (
        <div>
            { props.shouldShow &&
                <Alert variant={props.variant} onClose={props.closeButtonPressed}
                    data-testid={AddJobAppAlertTestIds.addJobAppAlert}
                    dismissible
                >
                    <Alert.Heading data-testid={AddJobAppAlertTestIds.addJobAlertHeading}>
                        {header}                
                    </Alert.Heading>
                    <p data-testid={AddJobAppAlertTestIds.addJobAlertBody}>
                        {alertMessage}
                    </p>
                </Alert>
            }
        </div>
    )
}