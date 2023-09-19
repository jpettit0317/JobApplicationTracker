import { DeleteJobAppProps } from "../alertProps/DeleteJobAppAlertProps";
import { DeleteJobAppTestIds } from "../../../enums/DeleteJobAppTestIds_enum";
import { Alert, Button, Stack } from "react-bootstrap";

export const DeleteJobAppAlert = (props: DeleteJobAppProps) => {
    const header = "Delete Job App";
    const message = "Are you sure you want to delete this job app?";

    const onClose = () => {
        props.onClosePressed();
    };

    const onDeletePressed = () => {
        props.onDeletePressed();
    };
    
    return (
        <div>
            { props.shouldShow &&
                <div style={ { display: "flex", alignItems: "center", justifyContent: "center" } }>
                    <Alert variant={props.variant} onClose={onClose}
                    data-testid={DeleteJobAppTestIds.alert}
                    dismissible
                    style={ { width: "500px" }}
                    >
                        <Alert.Heading data-testid={DeleteJobAppTestIds.alertHeader}>
                            {header}                
                        </Alert.Heading>
                        <p data-testid={DeleteJobAppTestIds.alertBody}>
                            {message}
                        </p>
                        <div style={ { alignItems: "center", justifyContent: "center" } }>
                                <span style={ { paddingRight: "10px" } }>
                                    <Button onClick={onDeletePressed} variant="danger">Delete</Button>
                                </span>
                                <span style={ { paddingLeft: "10px" } }>
                                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                                </span>
                        </div>
                    </Alert>
                </div>
        }
        </div>
    );
};