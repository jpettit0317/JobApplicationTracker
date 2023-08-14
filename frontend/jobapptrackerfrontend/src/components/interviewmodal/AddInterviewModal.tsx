import { useState } from "react";
import { AddInterviewModalProps } from "./AddInterviewModalProps";
import { JobInterview } from "../../model/interfaces/jobapp/JobInterview";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { InterviewModalErrors } from "./InterviewModalErrors";
import { checkForInterviewErrors } from "../../functions/interviewModalError/checkForInterviewErrors";
import { convertDateToUTC } from "../../functions/helperfunctions/datefunctions/convertDateToUTC";
import { AddInterviewModalTestIds } from "../../enums/jobinterviewtestids/AddInterviewModalTestIds_enum";

export const AddInterviewModal = (props: AddInterviewModalProps) => {
    const cancelButtonText = "Cancel";
    const addInterviewButtonText = "Add Interview";

    const [jobInterivew, setJobInterview] = useState<JobInterview>({
         jobappid: props.id,
         id: "",
         type: "",
         startDate: new Date(),
         endDate: new Date(),
         location: ""
    });

    const [addInterviewErrors, setInterviewErrors] = useState<InterviewModalErrors>({
        typeError: "",
        startDateError: "",
        endDateError: "",
        isTypeErrorInErrorState: false,
        isStartDateInErrorState: false,
        isEndDateErrorState: false
    });

    const getDateString = (date: Date): string => {
        return date.toLocaleString();
    }

    const onHide = () => {
        props.onHide();
    };

    const onSubmit = () => {
        const errors = checkForInterviewErrors(jobInterivew);
        setInterviewErrors({
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
        
        props.onSubmit(jobInterivew);
    }

    const onTypeChange = (e: any) => {
        const newType = e.target.value;

        setJobInterview({
            ...jobInterivew,
            type: newType
        });
        setInterviewErrors({
            ...addInterviewErrors,
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
        const newStartDate = convertDateToUTC(e.target.value as string);

        setJobInterview({
            ...jobInterivew,
            startDate: newStartDate
        });
        setInterviewErrors({
            ...addInterviewErrors,
            isStartDateInErrorState: false,
            startDateError: ""
        });
    }

    const onEndDateChanged = (e: any) => {
        const newEndDate = convertDateToUTC(e.target.value as string);

        setJobInterview({
            ...jobInterivew,
            endDate: newEndDate
        });
        setInterviewErrors({
            ...addInterviewErrors,
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

    return(
        <Modal show={props.shouldShow} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Interview</Modal.Title>
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
                        isInvalid={addInterviewErrors.isTypeErrorInErrorState}
                        data-testid={AddInterviewModalTestIds.interviewType}
                        />
                        { addInterviewErrors.isTypeErrorInErrorState &&
                         <Form.Control.Feedback type="invalid" data-testid={AddInterviewModalTestIds.interviewTypeError}>
                            {addInterviewErrors.typeError} 
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
                            data-testid={AddInterviewModalTestIds.locationField}
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
                            isInvalid={addInterviewErrors.isStartDateInErrorState}
                            data-testid={AddInterviewModalTestIds.startDateField}
                        />
                        { addInterviewErrors.isStartDateInErrorState &&
                            <Form.Control.Feedback type="invalid" data-testid={AddInterviewModalTestIds.startDateError}>
                                {addInterviewErrors.startDateError}
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel> 
                    <FloatingLabel
                        label="Ending Date*"
                        className="mb-3"
                        style={ { color: "black" } }
                    >
                        <Form.Control 
                                type="datetime-local" 
                                name="enddate"
                                onChange={onEndDateChanged}
                                required
                                isInvalid={addInterviewErrors.isEndDateErrorState}
                                data-testid={AddInterviewModalTestIds.endDateField}
                        />
                        { addInterviewErrors.isEndDateErrorState &&
                            <Form.Control.Feedback type="invalid" data-testid={AddInterviewModalTestIds.endDateError}>
                                {addInterviewErrors.endDateError}    
                            </Form.Control.Feedback> 
                        }
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} data-testid={AddInterviewModalTestIds.cancelButton}>
                    {cancelButtonText} 
                </Button>
                <Button variant="primary" onClick={onSubmit} data-testid={AddInterviewModalTestIds.addInterviewButton}>
                    {addInterviewButtonText} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
};