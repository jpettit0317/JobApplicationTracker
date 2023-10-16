import { useState } from "react";
import { JobInterview } from "../../model/interfaces/jobapp/JobInterview";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { InterviewModalErrors } from "./InterviewModalErrors";
import { EditInterviewModalProps } from "./EditInterviewModalProps";
import { checkForInterviewErrors } from "../../functions/interviewModalError/checkForInterviewErrors";
import { EditInterviewModalTestIds } from "../../enums/jobinterviewtestids/EditInterviewModalTestIds_enum";
import { formatDateForDatePicker } from "../../functions/helperfunctions/datefunctions/formatDateForDatePicker";

export const EditInterviewModal = (props: EditInterviewModalProps) => {
    const [jobInterivew, setJobInterview] = useState<JobInterview>({
        ...props.jobInterview
    });

    const oldStartDate = props.jobInterview.startDate;
    const oldEndDate = props.jobInterview.endDate;

    const getDateString = (input: Date) => {
        return formatDateForDatePicker(input);
    }

    const [editInterviewErrors, setEditInterviewErrors] = useState<InterviewModalErrors>({
        typeError: "",
        startDateError: "",
        endDateError: "",
        isTypeErrorInErrorState: false,
        isStartDateInErrorState: false,
        isEndDateErrorState: false
    });

    const onHide = () => {
        props.onHide();
    };

    const onSubmit = () => {
        const errors = checkForInterviewErrors(jobInterivew);
        setEditInterviewErrors({
            typeError: errors.typeError,
            isTypeErrorInErrorState: errors.isTypeErrorInErrorState,
            startDateError: errors.startDateError,
            isStartDateInErrorState: errors.isStartDateInErrorState,
            endDateError: errors.endDateError,
            isEndDateErrorState: errors.isEndDateErrorState 
        });

        if (areThereErrors(errors)) {
            return;
        }
        
        props.onEdit(jobInterivew);
    }

    const onTypeChange = (e: any) => {
        const newType = e.target.value;

        setJobInterview({
            ...jobInterivew,
            type: newType
        });
        setEditInterviewErrors({
            ...editInterviewErrors,
            isTypeErrorInErrorState: false,
            typeError: ""
        });
    };

    const onLocationChange = (e: any) => {
        const newLocation = e.target.value;

        setJobInterview({
            ...jobInterivew,
            location: newLocation
        });
    };

    const onStartDateChanged = (e: any) => {
        const newStartDate = e.target.value;

        setJobInterview({
            ...jobInterivew,
            startDate: newStartDate
        });
        setEditInterviewErrors({
            ...editInterviewErrors,
            isStartDateInErrorState: false,
            startDateError: ""
        });
    }

    const onEndDateChanged = (e: any) => {
        const newEndDate = e.target.value;

        setJobInterview({
            ...jobInterivew,
            endDate: newEndDate
        });
        setEditInterviewErrors({
            ...editInterviewErrors,
            isEndDateErrorState: false,
            endDateError: ""
        });
    };

    const areThereErrors = (errors: InterviewModalErrors): boolean => {
        if (errors.isTypeErrorInErrorState || errors.isStartDateInErrorState
                || errors.isEndDateErrorState) {
                    return true;
        }
        return false;
    };

    const editInterviewHeader = "Edit Interview";
    const submit = "Submit";
    const cancel = "Cancel";

    return(
        <Modal show={props.shouldShow} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{editInterviewHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel
                        label="Type*"
                        className="mb-3"
                        style={ { color: "black" } }
                    >
                        <Form.Control
                        type="input"
                        placeholder="Technical"
                        autoFocus
                        onChange={onTypeChange}
                        required
                        isInvalid={editInterviewErrors.isTypeErrorInErrorState}
                        value={jobInterivew.type}
                        data-testid={EditInterviewModalTestIds.interviewType}
                        />
                        { editInterviewErrors.isTypeErrorInErrorState &&
                            <Form.Control.Feedback type="invalid" data-testid={EditInterviewModalTestIds.interviewTypeError}>
                                {editInterviewErrors.typeError} 
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel> 
                    <FloatingLabel
                        label="Location"
                        className="mb-3"
                        style={ { color: "black" } }
                    >
                        <Form.Control 
                            type="input" 
                            placeholder="Here"
                            onChange={onLocationChange}
                            value={jobInterivew.location}
                            data-testid={EditInterviewModalTestIds.locationField}
                        /> 
                    </FloatingLabel> 
                    <FloatingLabel
                        label="Old Start Date"
                        className="mb-3"
                        style = { { color: "black" } }
                    >
                        <Form.Control 
                            type="input" 
                            name="oldstartdate"
                            value={getDateString(oldStartDate)}
                            required
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Starting Date*"
                        className="mb-3"
                        style={ { color: "black" } }
                        
                    >
                        <Form.Control 
                            type="datetime-local" 
                            name="startdate"
                            onChange={onStartDateChanged}
                            required
                            isInvalid={editInterviewErrors.isStartDateInErrorState}
                            data-testid={EditInterviewModalTestIds.startDateField}
                        />
                        { editInterviewErrors.isStartDateInErrorState &&
                             <Form.Control.Feedback type="invalid" data-testid={EditInterviewModalTestIds.startDateError}>
                                {editInterviewErrors.startDateError}
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel> 
                    <FloatingLabel
                        label="Old End Date"
                        className="mb-3"
                        style = { { color: "black" } }
                    >
                        <Form.Control 
                            type="input" 
                            name="oldenddate"
                            value={getDateString(oldEndDate)}
                            required
                            readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Ending Date*"
                        className="mb-3"
                        style={ { color: "black" } }
                    >
                         <Form.Control 
                                type="datetime-local" 
                                name="enddate"
                                id="editenddate"
                                onChange={onEndDateChanged}
                                required
                                isInvalid={editInterviewErrors.isEndDateErrorState}
                                data-testid={EditInterviewModalTestIds.endDateField}
                        />
                        { editInterviewErrors.isEndDateErrorState &&
                             <Form.Control.Feedback type="invalid" data-testid={EditInterviewModalTestIds.endDateError}>
                                {editInterviewErrors.endDateError}    
                            </Form.Control.Feedback>  
                        }
                    </FloatingLabel>    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} data-testid={EditInterviewModalTestIds.cancelButton}>
                    {cancel}
                </Button>
                <Button variant="primary" onClick={onSubmit} data-testid={EditInterviewModalTestIds.editInterviewButton}>
                    {submit} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
};