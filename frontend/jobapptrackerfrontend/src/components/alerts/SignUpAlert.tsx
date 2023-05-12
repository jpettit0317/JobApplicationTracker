import { Alert } from "react-bootstrap";
import { SignUpAlertProps } from "./alertProps/SignUpAlertProps";
import { SignUpAlertTestIds } from "../../enums/SignUpAlertTestIds_enum";

export const SignUpAlert = (props: SignUpAlertProps) => {
    const alertMessage = props.alertMessage;
    const header = "Error"
    return (
        <div>
            { props.shouldShow &&
                <Alert variant="warning" onClose={props.closeButtonPressed}
                    data-testid={SignUpAlertTestIds.signUpAlert}
                    dismissible
                >
                    <Alert.Heading data-testid={SignUpAlertTestIds.signUpAlertHeading}>
                        {header}                
                    </Alert.Heading>
                    <p data-testid={SignUpAlertTestIds.signUpAlertBody}>
                        {alertMessage}
                    </p>
                </Alert>
            }
        </div>
    )
}