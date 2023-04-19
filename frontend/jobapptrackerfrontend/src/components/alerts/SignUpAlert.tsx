import { useState } from "react";
import { Alert } from "react-bootstrap";
import { SignUpAlertProps } from "./alertProps/SignUpAlertProps";
import { SignUpAlertTestIds } from "../../enums/SignUpAlertTestIds_enum";

export const SignUpAlert = (props: SignUpAlertProps) => {
    const alertMessage = props.alertMessage;

    return (
        <div>
            { props.shouldShow &&
                <Alert variant="warning" onClose={props.closeButtonPressed} data-testid={SignUpAlertTestIds.signUpAlert}>
                    <Alert.Heading data-testid={SignUpAlertTestIds.signUpAlertHeading}>{alertMessage}</Alert.Heading>
                </Alert>
            }
        </div>
    )
}