import { Modal, Spinner } from "react-bootstrap";

export const LoadingSpinner = () => {
    return (
        <div className="modal show"
            style={{ display: 'block', position: 'center', zIndex: '9999px'}}
            data-testid="modalShow">
            <Modal.Dialog style={{padding: '150px', position: 'center'}} data-testid="modalDialog">
                <Modal.Title data-testid="modalTitle">Loading...</Modal.Title>
                <Modal.Body data-testid="modalBody">
                    <Spinner animation="border" data-testid="spinner"/> 
                </Modal.Body>
            </Modal.Dialog>
        
        </div>
        
    );
}