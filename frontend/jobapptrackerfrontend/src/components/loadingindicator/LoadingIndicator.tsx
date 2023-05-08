import { PulseLoader } from "react-spinners";
import { LoadingIndicatorProps } from "./LoadingIndicatorProps";
import { Modal } from "react-bootstrap";

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return (
        <div
            className="modal show"
            style={
                { 
                    display: 'block', 
                    position: 'absolute', 
                    zIndex: 1000,
                    margin: '100px',
                    width: '90%',
                    padding: '100px',
                }
            }
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Loading...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PulseLoader
                        loading={props.isLoading}
                        size={props.size}
                        aria-label={props.ariaLabel}
                        data-testid={props.testId} 
                    />
                </Modal.Body>
            </Modal.Dialog>
            
        </div>
    );
}