import { useNavigate } from "react-router";
import { navBarTitle } from "../../constants/NavBarTitle";
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
import { 
    deleteTokenAndDate,
    getToken,
    saveDateLastChecked,
} from "../../functions/session/localStorage";
import { DeleteJobAppAlert } from "../alerts/deletejobappalert/DeleteJobAppAlert";
import { deleteJobApp } from "../../functions/networkcalls/deleteJobApp";
import { NavBar } from "../navbar/NavBar";

export const JobAppListPage = () => {
    const navigate = useNavigate();
    const shouldLoadJobApps = useRef(true);
    const [jobApps, setJobApps] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);
    const [alertErrorMessage, setAlertMessage] = useState<string>("");
    const [deleteIdSelected, setDeleteIdSelected] = useState<string>("");
    const [isDeleteAlertShowing, setIsDeleteAlertShowing] = useState<boolean>(false);

    const logUserOut = () => {
        deleteTokenAndDate();
        navigate(RoutePath.login);        
    }

    const navigateToAddJobApp = () => {
        shouldLoadJobApps.current = true;
        navigate(RoutePath.addJobApp);
    };

    const onEdit = (id: string) => {
        shouldLoadJobApps.current = true;
        const editPath = `${RoutePath.editJobApp}${id}`;
        navigate(editPath);
    }

    const onDelete = (id: string) => {
        setDeleteIdSelected(id);
        setIsDeleteAlertShowing(true);
    }

    const removeFromJobApps = (id: string) => {
        setIsLoading(false);
        const newJobApps = jobApps.filter((jobApp) => jobApp.id !== id);
        setJobApps(newJobApps);
    }

    const onDeleteAlertPressed = async () => {
        const token = getToken();
        
        if (deleteIdSelected === "") {
            return;    
        }
        setIsLoading(true);

        try {
            const resp = await deleteJobApp(APIEndPoint.deleteJobApp, deleteIdSelected, token);

            if (resp === undefined) {
                setIsAlertShowing(true);
                setAlertMessage("Something went wrong!!");
                setIsLoading(false);
                setIsDeleteAlertShowing(false);
                setDeleteIdSelected("");
            } else if (resp.isError()) {
                setIsAlertShowing(true);
                setAlertMessage(resp.errorMessage); 
                setIsLoading(false);
                setIsDeleteAlertShowing(false);
                setDeleteIdSelected("");
            } else {
                removeFromJobApps(deleteIdSelected);
                setIsDeleteAlertShowing(false);
                setDeleteIdSelected("");
            }
        } catch(error) {
            setIsAlertShowing(true);
            setAlertMessage("Something went wrong!!");
        }
    };

    const onView = (id: string) => {
        const viewJobAppPagePath = `${RoutePath.viewJobApp}${id}`;
        navigate(viewJobAppPagePath); 
    }

    const closeAlert = () => {
        setAlertMessage("");
        setIsAlertShowing(false); 
    }

    const closeDeleteJobAppAlert = () => {
        setIsDeleteAlertShowing(false);
        setDeleteIdSelected("");
    }

    useEffect(() => {
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
                    displayAlert("Something went wrong!!", true);
                } else if (resp.isErrorOfType(HttpResponseErrorType.tokenExpired)) {
                    deleteTokenAndGoBackToLogin();
                } else if (resp.isErrorOfType(HttpResponseErrorType.other)) {
                    displayAlert(resp.errorMessage, true);
                } else {
                    setJobApps(resp.data);
                    saveDateLastChecked(new Date());
                }
            } catch (error) {
                displayAlert("Something went wrong!!", true);
            }
        }

        const loadJobApps = () => {
            const token = getToken();    
            const url = APIEndPoint.getAllJobApps;
            loadAllJobApps(token, url);
        }

        if (shouldLoadJobApps.current) {
            shouldLoadJobApps.current = false;

            setIsLoading(true);
            loadJobApps();
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <NavBar 
                title={navBarTitle}
                logoutUser={logUserOut}
                navigateToAddJobApp={navigateToAddJobApp}
                shouldShowDropDown
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
            {  isDeleteAlertShowing &&
                <DeleteJobAppAlert 
                    shouldShow={isDeleteAlertShowing}
                    variant="warning"
                    onClosePressed={closeDeleteJobAppAlert}
                    onDeletePressed={onDeleteAlertPressed}
                    idToDelete={deleteIdSelected}
                /> 
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