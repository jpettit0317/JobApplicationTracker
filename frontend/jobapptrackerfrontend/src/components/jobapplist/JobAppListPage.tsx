import { useNavigate } from "react-router";
import { navBarTitle } from "../../constants/NavBarTitle";
import { NavSearchBar } from "../navbar/NavSearchBar";
import { JobAppListPageTestIds } from "./JobAppListPageTestIds";
import { RoutePath } from "../../enums/RoutePath_enum";
import { JobApplication } from "../../model/interfaces/jobapp/JobApplication";
import { JobAppCard } from "../cards/jobappcard/JobAppCard";
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllJobApps } from "../../functions/networkcalls/getAllJobApps";
import { APIEndPoint } from "../../enums/APIEndPoint_enum";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { JobAppAlert } from "../alerts/JobAppAlert";
import { LoadingIndicator } from "../loadingindicator/LoadingIndicator";
import { getNewJobApps } from "../../functions/networkcalls/getNewJobApps";
import { 
    deleteTokenAndDate,
    getToken,
    getDateLastChecked,
    saveDateLastChecked
} from "../../functions/session/localStorage";
import { sortArray } from "../../functions/helperfunctions/sortArray";
import { compareJobAppsDateAppliedDescending } from "../../functions/helperfunctions/comparefunctions/compareDateApplied";

export const JobAppListPage = () => {
    const navigate = useNavigate();
    const shouldLoadJobApps = useRef(true);

    const onSearchButtonPressed = (searchTerm: string = "") => {
        console.log("The search term is ", searchTerm);
    };

    const logUserOut = () => {
        deleteTokenAndDate();
        navigate(RoutePath.login);        
    }

    const navigateToAddJobApp = () => {
        shouldLoadJobApps.current = true;
        navigate(RoutePath.addJobApp);
    };

    const onEdit = (index: number) => {
        console.log(`${index} card on edit was pressed.`);
    }

    const onDelete = (index: number) => {
        console.log(`${index} delete button was pressed.`);
    }

    const onView = (index: number) => {
        console.log(`${index} view button was pressed.`);
    }

    const closeAlert = () => {
        setAlertMessage("");
        setIsAlertShowing(false); 
    }

    const [jobApps, setJobApps] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);
    const [alertErrorMessage, setAlertMessage] = useState<string>("");

    useEffect(() => {
        const updateJobApps = (newerJobApps: JobApplication[]) => {
            if (newerJobApps.length !== 0) {
                const sortedJobApps = sortArray<JobApplication>(newerJobApps,
                    compareJobAppsDateAppliedDescending);
                const newJobApps = sortedJobApps.concat(jobApps);
                setJobApps(newJobApps);
            }
        }

        const displayAlert = (alertErrorMessage: string = "", shouldShowAlert: boolean) => {
            setIsAlertShowing(shouldShowAlert);
            setAlertMessage(alertErrorMessage);
        }

        const deleteTokenAndGoBackToLogin = () => {
            deleteTokenAndDate(); 
            navigate(RoutePath.login);
        };

        const loadAllJobApps = async (token: string, url: string) => {
            try {
                const resp = await getAllJobApps(token, url);
                if (resp === undefined) {
                    console.log("Undefined All JObapps")
                    displayAlert("Something went wrong!!", true);
                } else if (resp.isErrorOfType(HttpResponseErrorType.tokenExpired)) {
                    console.log("Deleting token from getAll")
                    deleteTokenAndGoBackToLogin();
                } else if (resp.isErrorOfType(HttpResponseErrorType.other)) {
                    console.log("Other erro getAll")
                    displayAlert(resp.errorMessage, true);
                } else {
                    console.log("Setting jobApps getAll")
                    setJobApps(resp.data); 
                    saveDateLastChecked(new Date());
                }
            } catch (error) {
                console.log("Error when loading all job apps " + error);
                displayAlert("Something went wrong!!", true);
            }
        }

        const loadNewJobApps = async (token: string, url: string, dateLastChecked: string) => {
            try {
                const resp = await getNewJobApps(token, url, dateLastChecked);

                if (resp === undefined) {
                    console.log("Undefined etNEw")
                    displayAlert("Something went wrong!!", true);
                } else if (resp.isErrorOfType(HttpResponseErrorType.tokenExpired)) {
                    console.log("delte token getNew")
                    deleteTokenAndGoBackToLogin();
                } else if (resp.isErrorOfType(HttpResponseErrorType.other)) {
                    console.log("Display other alert getNew");
                    displayAlert(resp.errorMessage, true);
                } else {
                    console.log("Save getNew");
                    updateJobApps(resp.data);
                    saveDateLastChecked(new Date());
                }
            } catch (error) {
                console.log("Error when loading all job apps " + error);
                displayAlert("Something went wrong!!", true);
            }
        }

        const loadJobApps = () => {
            const savedDateLastChecked = getDateLastChecked();
            const token = getToken();

            if (savedDateLastChecked !== "") {
                const url = APIEndPoint.getNewJobApps;
                loadNewJobApps(token, url, savedDateLastChecked);
            } else {
                const url = APIEndPoint.getAllJobApps;
                loadAllJobApps(token, url);
            }
            shouldLoadJobApps.current = false;
        }
        

        if (shouldLoadJobApps.current) {
            setIsLoading(true);
            console.log("Loading")
            loadJobApps();
            setIsLoading(false);
        }
    }, []);

    const renderJobAppList = () => {
        return (
            <Container>
                <Row>
                    {
                        jobApps.map((jobApp, index) => (
                            <Col index={index} key={jobApp.id} lg="4">
                                <JobAppCard 
                                    jobApp={jobApp}
                                    index={index}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                    onView={onView}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    };

    return (
        <div>
            <NavSearchBar 
                onSearchButtonPressed={onSearchButtonPressed}
                title={navBarTitle}
                logoutUser={logUserOut}
                navigateToAddJobApp={navigateToAddJobApp}
            />
            { isAlertShowing &&
                <JobAppAlert alertMessage={alertErrorMessage} 
                    shouldShow={isAlertShowing} 
                    variant="danger" 
                    closeButtonPressed={closeAlert}                    
                />
            }
            { isLoading &&
                <LoadingIndicator 
                    isLoading={isLoading} 
                    size={30} 
                    ariaLabel={"Loading"} 
                    testId="JobAppListLoadingIndicator" />
            }
            <h5 data-testid={JobAppListPageTestIds.jobAppListPageHeader} style={ { padding: "20px"} }>
                Job Application List
            </h5>
            <div style={ { paddingTop: "20px" } }>
                {renderJobAppList()}
            </div>
        </div>
    );
}