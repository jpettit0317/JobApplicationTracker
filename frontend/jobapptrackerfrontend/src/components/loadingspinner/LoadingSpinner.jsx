import { Modal, Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
    return (
        <div className="modal show"
            style={{ display: 'block', position: 'center', zIndex: '9999px'}}
            >
            <Modal.Dialog style={{padding: '150px', position: 'center'}}>
                <Modal.Title>Loading...</Modal.Title>
                <Modal.Body>
                    <Spinner animation="border" /> 
                </Modal.Body>
            </Modal.Dialog>
        
        </div>
        
    );
}