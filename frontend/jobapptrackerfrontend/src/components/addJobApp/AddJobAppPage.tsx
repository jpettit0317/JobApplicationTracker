import { useState } from "react"
import { navBarTitle } from "../../constants/NavBarTitle";
import { NavBar } from "../navbar/NavBar";
import './AddJobAppPage.css';
import { Button, Container, FloatingLabel, Form, Stack, Table} from "react-bootstrap";
import { FormControlFeedback } from "../formcontrolhelper/FormControlFeedback";
import { LoadingIndicator } from "../loadingindicator/LoadingIndicator";
import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { APIEndPoint } from "../../enums/APIEndPoint_enum";
import { JobApplication } from "../../model/interfaces/jobapp/JobApplication";
import { AddJobAppErrors } from "../../model/interfaces/jobapp/AddJobAppErrors";
import { JobInterview } from "../../model/interfaces/jobapp/JobInterview";
import { JobInterviewCard } from "../cards/jobinterviewcard/JobInterviewCard";
import { AddInterviewModal } from "../interviewmodal/AddInterviewModal";
import { compareStartDates } from "../../functions/helperfunctions/comparefunctions/compareJobInterviews";
import { sortArray } from "../../functions/helperfunctions/sortArray";
import { EditInterviewModal } from "../interviewmodal/EditInterviewModal";
import { checkForJobAppErrors } from "../../functions/helperfunctions/addjobappfunctions/checkForJobAppErrors";
import { convertDateToUTC } from "../../functions/helperfunctions/datefunctions/convertDateToUTC";
import { AddJobAppAlert } from "../alerts/alertcomponent/AddJobAppAlert";
import { addJobApp } from "../../functions/networkcalls/addJobApp";
import { AddJobAppPageTestIds } from "../../enums/addjobapptestids/AddJobAppPageTestIds_enum";
import { deleteTokenAndDate, getToken } from "../../functions/session/localStorage";
import { useNavigate } from "react-router";
import { RoutePath } from "../../enums/RoutePath_enum";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";

export const AddJobAppPage = () => {
    const submitButtonText = "Submit Job Application";
    const addInterviewButtonText = "Add Interview";
    const navigate = useNavigate();

    const [jobApp, setJobApp] = useState<JobApplication>({
        company: "",
        jobTitle: "",
        description: "",
        status: "",
        id: "",
        dateApplied: new Date(),
        dateModified: new Date(),
        interviews: []
    });

    const [jobAppErrors, setJobAppErrors] = useState<AddJobAppErrors>({
        companyError: "",
        jobTitleError: "",
        descriptionError: "",
        statusError: "",
        dateAppliedError: "",
        isCompanyInErrorState: false,
        isJobTitleInErrorState: false,
        isDescriptionInErrorState: false,
        isStatusErrorInErrorState: false,
        isDateAppliedInErrorState: false
    });
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    
    const [isAddModalShowing, setisAddModalShowing] = useState<boolean>(false);
    
    const [isEditModalShowing, setIsEditModalShowing] = useState<boolean>(false);
    const [selectedEditInterview, setSelectedEditInterview] = useState<JobInterview>({
        jobappid: "",
        id: "",
        type: "",
        startDate: new Date(),
        endDate: new Date(),
        location: ""
    });

    const header = "Add Job Application";

    const onJobTitleChange = (e: any) => {
        setJobApp({
            ...jobApp,
            jobTitle: e.target.value
        });
        setJobAppErrors({
            ...jobAppErrors,
            jobTitleError: "",
            isJobTitleInErrorState: false
        });
    }

    const onCompanyChange= (e: any) => {
        setJobApp({
            ...jobApp,
            company: e.target.value
        });
        setJobAppErrors({
            ...jobAppErrors,
            companyError: "",
            isCompanyInErrorState: false
        });
    }

    const onDescriptionChange = (e: any) => {
        setJobApp({
            ...jobApp,
            description: e.target.value
        });
        setJobAppErrors({
            ...jobAppErrors,
            descriptionError: "",
            isDescriptionInErrorState: false
        });
    }

    const onStatusChange = (e: any) => {
        setJobApp({
            ...jobApp,
            status: e.target.value
        });
        setJobAppErrors({
            ...jobAppErrors,
            statusError: "",
            isStatusErrorInErrorState: false
        });
    }

    const onDateChanged = (e: any) => {
        const date = convertDateToUTC(e.target.value as string); 
        console.log("Date is " + date.toString());

        setJobApp({
            ...jobApp,
            dateApplied: date 
        });
        setJobAppErrors({
            ...jobAppErrors,
            dateAppliedError: "",
            isDateAppliedInErrorState: false
        });
    };

    const addInterview = (interview: JobInterview) => {
        const newInterviews = 
            sortArray([...jobApp.interviews, interview], compareStartDates);
        setJobApp({
            ...jobApp,
            interviews: newInterviews
        });

        closeModal();
    };

    const editInterview = (editedInterview: JobInterview) => {
        let editIndex = jobApp.interviews.findIndex((interview) => editedInterview.id === interview.id);
        let interviews = jobApp.interviews;

        interviews[editIndex] = editedInterview;

        setJobApp({
            ...jobApp,
            interviews: interviews
        });
        closeEditModal();
    };

    const deleteInterview = (index: number) => {
        let interviews = jobApp.interviews;
        interviews.splice(index, 1);

        setJobApp({
            ...jobApp,
            interviews: interviews
        });
    }

    const onSubmitButtonPressed = (e: any) => {
        e.preventDefault();

        const newAddJobAppErrors = checkForJobAppErrors(jobApp);
        setJobAppErrors(newAddJobAppErrors);

        if (areThereErrors(newAddJobAppErrors)) {
            return;
        }
        
        addJobApplicationToBackend();
    }

    const clearForm = () => {
        clearErrors();
        clearJobApp();
    };

    const clearJobApp = () => {
        setJobApp({
            company: "",
            jobTitle: "",
            description: "",
            status: "",
            id: "",
            dateApplied: new Date(),
            dateModified: new Date(),
            interviews: [] 
        });
    };

    const clearErrors = () => {
        setJobAppErrors({
            companyError: "",
            jobTitleError: "",
            descriptionError: "",
            statusError: "",
            dateAppliedError: "",
            isCompanyInErrorState: false,
            isJobTitleInErrorState: false,
            isDescriptionInErrorState: false,
            isStatusErrorInErrorState: false,
            isDateAppliedInErrorState: false
        });
    }

    const onAddInterviewButtonPressed = () => {
        setisAddModalShowing(true);
    }

    const addJobApplicationToBackend = async () => {
        setIsLoading(true);
        console.log("The url is " + APIEndPoint.addJobApp);
        const token = getToken();
        const url = APIEndPoint.addJobApp;

        addJobApp(jobApp, url, token).then((response) => {
             handleAddJobApp(response);
        })
         .catch((reason: string) => {
             handleUnexpectedError(reason);
        });
    }

    const closeAlert = () => {
        setAlertMessage("");
        setIsAlertShowing(false);
    }

    const closeModal = () => {
        setisAddModalShowing(false);
    };

    const closeEditModal = () => {
        setIsEditModalShowing(false);
    }

    const handleAddJobApp = (response: (HttpResponse<string> | undefined)) => {
        setIsLoading(false);

        if (response !== undefined && !response.isError()) {
            handleSuccess(); 
        } else if (response === undefined) {
            handleUndefined();
        } else if (response.isErrorOfType(HttpResponseErrorType.tokenExpired)) {
            handleTokenExpired();
        } else if (response.isError()) {
            handleError(response);
        }
    }

    const handleSuccess = () => {
        clearForm();
    }

    const handleError = (resp: HttpResponse<string>) => {
        console.log("The error is " + resp.errorMessage);
        setAlertMessage(resp.errorMessage);
        setIsAlertShowing(true);
    }

    const handleUndefined = () => {
        console.log("The error is undefined");
        setAlertMessage("Something went wrong!!");
        setIsAlertShowing(true);
    }

    const handleUnexpectedError = (reasonForFailure: string = "") => {
        console.log("Something unexpected happended.");
        console.log(reasonForFailure);
        setIsLoading(false);
        setAlertMessage(reasonForFailure);
        setIsAlertShowing(true); 
    }

    const handleTokenExpired = () => {
        deleteTokenAndDate();
        navigate(RoutePath.login);
    }

    const areThereErrors = (errors: AddJobAppErrors): boolean => {
        return errors.companyError !== "" ||
            errors.dateAppliedError !== "" ||
            errors.descriptionError !== "" ||
            errors.jobTitleError !== "" ||
            errors.statusError !== "";
    }

    const onEditButtonPressed = (id: string) => {
        const index = jobApp.interviews.findIndex((interview) => interview.id === id);
        
        setSelectedEditInterview(jobApp.interviews[index]);
        setIsEditModalShowing(true);
    }

    const onDeleteButtonPressed = (index: number) => {
        deleteInterview(index);
    };

    return (
        <div>
            { isAlertShowing &&
                <AddJobAppAlert 
                    alertMessage={alertMessage}
                    shouldShow={isAlertShowing}
                    closeButtonPressed={closeAlert}
                    variant="danger"
                />
            }
            {  isAddModalShowing &&
                <AddInterviewModal 
                    size="md"
                    shouldShow={isAddModalShowing}
                    onSubmit={addInterview}
                    onHide={closeModal}
                    id={jobApp.id}
                />
            }
            {   isEditModalShowing &&
                <EditInterviewModal
                    jobInterview={selectedEditInterview}
                    size="md"
                    shouldShow={isEditModalShowing}
                    onEdit={editInterview}
                    onHide={closeEditModal}
                />
            }
            <NavBar title={navBarTitle} />
            <Container className="signupformcontainer">
                { isLoading &&
                     <LoadingIndicator 
                        isLoading={isLoading}
                        size={30}
                        ariaLabel="Loading"
                        testId="addJobAppLoadingIndicator"
                    />
                }
                <Form className="Auth-form">
                    <h4 data-testid={AddJobAppPageTestIds.header}>
                        {header}
                    </h4>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Job Title*"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control
                        placeholder="Junior Software Engineer"
                        className="me-2"
                        aria-label="Job Title*"
                        onChange={onJobTitleChange}
                        required
                        value={jobApp.jobTitle}
                        isInvalid={jobAppErrors.isJobTitleInErrorState}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.jobTitle}
                        />
                        { jobAppErrors.isJobTitleInErrorState &&
                            <FormControlFeedback type="invalid" 
                                text={jobAppErrors.jobTitleError}
                                data-testid={AddJobAppPageTestIds.jobTitleError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Company*"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control
                        placeholder="Google"
                        className="me-2"
                        aria-label="Company"
                        onChange={onCompanyChange}
                        required
                        value={jobApp.company}
                        isInvalid={jobAppErrors.isCompanyInErrorState}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.companyField}
                        />
                        { jobAppErrors.isCompanyInErrorState &&
                            <FormControlFeedback type="invalid"
                                text={jobAppErrors.companyError}
                                data-testid={AddJobAppPageTestIds.companyError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control
                        as="textarea"
                        maxLength={300}
                        placeholder=""
                        className="mb-3"
                        aria-label="Description"
                        onChange={onDescriptionChange}
                        value={jobApp.description}
                        isInvalid={jobAppErrors.isDescriptionInErrorState}
                        style={ {color: "black", minHeight: "100px"} }
                        data-testid={AddJobAppPageTestIds.descriptionField}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Status*"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control
                        placeholder="Technical"
                        className="me-2"
                        aria-label="Status"
                        onChange={onStatusChange}
                        required
                        value={jobApp.status}
                        isInvalid={jobAppErrors.isStatusErrorInErrorState}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.statusField}
                        />
                        { jobAppErrors.isStatusErrorInErrorState &&
                            <FormControlFeedback 
                                type="invalid"
                                text={jobAppErrors.statusError}
                                data-testid={AddJobAppPageTestIds.statusFieldError}
                            />
                        }
                    </FloatingLabel>
                    <FloatingLabel
                    label="Date Applied*"
                    controlId="floatingInput"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control className="me-2" type="datetime-local" name="dateapplied"
                             placeholder="Date Applied" onChange={onDateChanged}
                             style={ { color: "black" } } 
                             isInvalid={jobAppErrors.isDateAppliedInErrorState}
                             data-testid={AddJobAppPageTestIds.dateAppliedField}
                        />
                        { jobAppErrors.isDateAppliedInErrorState &&
                            <Form.Control.Feedback 
                            type="invalid"
                            data-testid={AddJobAppPageTestIds.dateAppliedError}
                            >
                                {jobAppErrors.dateAppliedError}
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel>
                    <Table responsive>
                        <tbody>
                            <tr>
                                {jobApp.interviews.map((jobInterview, index) => (
                                    <td key={index}>
                                        <JobInterviewCard 
                                            jobAppDate={new Date()} 
                                            jobInterview={jobInterview}
                                            onDeleteButtonPressed={onDeleteButtonPressed}
                                            onEditButtonPressed={onEditButtonPressed}
                                            index={index}
                                            id={jobApp.id}
                                            data-testid={AddJobAppPageTestIds.jobInterviewCard + index}
                                        />
                                    </td>
                                ))} 
                            </tr>
                        </tbody>
                    </Table> 
                    <Stack gap={2} direction="horizontal" style={ { marginTop: "10px", padding: "1px" } }>
                        <Button onClick={onSubmitButtonPressed} style={ { width: "100%" } } 
                            data-testid={AddJobAppPageTestIds.submitJobAppButton}>
                                {submitButtonText}
                        </Button>
                        <Button onClick={onAddInterviewButtonPressed} style={ { width: "100%" } } 
                            data-testid={AddJobAppPageTestIds.addInterviewButton}>
                                {addInterviewButtonText}
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </div>
    );

}