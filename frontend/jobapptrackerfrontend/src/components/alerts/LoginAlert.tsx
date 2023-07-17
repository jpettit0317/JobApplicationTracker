import { Alert } from "react-bootstrap";
import { LoginAlertProps } from "./alertProps/LoginAlertProps";
import { LoginAlertTestIds } from "../../enums/LoginAlertTestIds_enum";

export const LoginAlert = (props: LoginAlertProps) => {
    return (
        <div>
            { props.shouldShow &&
                <Alert variant="warning" onClose={props.closeButtonPressed}
                    data-testid={LoginAlertTestIds.loginAlert}
                    dismissible
                >
                    <Alert.Heading data-testid={LoginAlertTestIds.loginAlertHeader}>
                        {props.alertTitle}                
                    </Alert.Heading>
                    <p data-testid={LoginAlertTestIds.loginAlertBody}>
                        {props.alertMessage}
                    </p>
                </Alert>
            }
        </div>
    )
}