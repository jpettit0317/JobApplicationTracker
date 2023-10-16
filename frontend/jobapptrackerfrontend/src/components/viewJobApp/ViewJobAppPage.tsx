import { useEffect, useRef, useState } from "react";
import { ViewJobAppProps } from "./ViewJobAppPageProps";
import { AddJobAppAlert } from "../alerts/alertcomponent/AddJobAppAlert";
import { NavBar } from "../navbar/NavBar";
import { Container, FloatingLabel, Form, Table } from "react-bootstrap";
import { AddJobAppPageTestIds } from "../../enums/addjobapptestids/AddJobAppPageTestIds_enum";
import { LoadingIndicator } from "../loadingindicator/LoadingIndicator";
import { JobInterviewCard } from "../cards/jobinterviewcard/JobInterviewCard";
import { JobApplication, createJobApp } from "../../model/interfaces/jobapp/JobApplication";
import { useNavigate, useParams } from "react-router";

import './ViewJobAppPage.css';
import { getOneJobApp } from "../../functions/networkcalls/getOneJobApp";
import { RoutePath } from "../../enums/RoutePath_enum";
import { APIEndPoint } from "../../enums/APIEndPoint_enum";
import { deleteTokenAndDate, getToken } from "../../functions/session/localStorage";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { formatDateForDatePicker } from "../../functions/helperfunctions/datefunctions/formatDateForDatePicker";

export const ViewJobAppPage = (props: ViewJobAppProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const shouldLoadAgain = useRef<boolean>(true);

    const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [jobApp, setJobApp] = useState<JobApplication>(
        createJobApp("", "", "", "", "", new Date(), new Date(), [])
    );

    const navBarTitle = "Job Application Tracker";
    const header = "View Job Application";
    
    const closeAlert = () => {
        setAlertMessage("");
        setIsAlertShowing(false);
    }

    const getDateString = (date: Date, locale: string = "en-US"): string => {
        return formatDateForDatePicker(date, locale);
    }

    const logUserOut = () => {
        deleteTokenAndDate();
        navigate(RoutePath.login);        
    }

    const navigateToAddJobApp = () => {
        navigate(RoutePath.addJobApp);
    };

    useEffect(() => {
        const getJobAppById = async(baseURL: string, token: string) => {
            try {
                const resp = await getOneJobApp(baseURL, token, id);

                if (resp === undefined || resp.statusCode === 0) {
                    setIsLoading(false);
                    setAlertMessage("Something went wrong!!");
                    setIsAlertShowing(true);
                } else if (resp.isErrorOfType(HttpResponseErrorType.tokenExpired)) {
                    deleteTokenAndDate();
                    navigate(RoutePath.login);
                } else {
                    setJobApp(resp.data);
                }
            } catch (error) {
                setIsLoading(false);
                setAlertMessage("Something went wrong!!");
                setIsAlertShowing(true);
            }
        };
        
        if (shouldLoadAgain.current) {
            shouldLoadAgain.current = false;
            setIsLoading(true);

            const token = getToken();
            const url = APIEndPoint.getJobAppById;
            
            getJobAppById(url, token); 
            
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <NavBar 
                title={navBarTitle}
                logoutUser={logUserOut}
                navigateToAddJobApp={navigateToAddJobApp}
                shouldShowDropDown
            />
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
                        value={jobApp.jobTitle}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.jobTitle}
                        readOnly
                        />
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
                        value={jobApp.company}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.companyField}
                        readOnly
                        />
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
                        value={jobApp.description}
                        style={ {color: "black", minHeight: "100px"} }
                        data-testid={AddJobAppPageTestIds.descriptionField}
                        readOnly
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
                        value={jobApp.status}
                        style={ {color: "black"} }
                        data-testid={AddJobAppPageTestIds.statusField}
                        readOnly
                        />
                    </FloatingLabel>
                    <FloatingLabel
                    label="Date Applied*"
                    controlId="floatingInput"
                    className="mb-3"
                    style={ {color: "black"} }
                    >
                        <Form.Control className="me-2" name="dateapplied"
                            type="text"
                            placeholder="Date Applied"
                            value={getDateString(jobApp.dateApplied)}
                            style={ { color: "black" } }
                            data-testid={AddJobAppPageTestIds.dateAppliedField}
                            readOnly
                        />
                    </FloatingLabel>
                    <Table responsive>
                        <tbody>
                            <tr>
                                {jobApp.interviews.map((jobInterview, index) => (
                                    <td key={index}>
                                        <JobInterviewCard 
                                            shouldShowButtons={false}
                                            jobAppDate={new Date()} 
                                            jobInterview={jobInterview}
                                            onDeleteButtonPressed={() => {}}
                                            onEditButtonPressed={() => {}}
                                            index={index}
                                            id={jobApp.id}
                                            data-testid={AddJobAppPageTestIds.jobInterviewCard + index}
                                        />
                                    </td>
                                ))} 
                            </tr>
                        </tbody>
                    </Table> 
                </Form>
            </Container>
        </div>
    );
}