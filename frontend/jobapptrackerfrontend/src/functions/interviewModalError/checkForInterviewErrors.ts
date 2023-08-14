import { JobInterview } from "../../model/interfaces/jobapp/JobInterview"
import { InterviewModalErrors } from "../../components/interviewmodal/InterviewModalErrors"

export const checkForInterviewErrors = (interview: JobInterview): InterviewModalErrors => {
    const typeError = checkForTypeErrors(interview.type);
    const startDateError = checkForStartDateErrors(interview);
    const endDateError = checkForEndDateErrors(interview);

    const isTypeInErrorState = typeError === "" ? false : true;
    const isStartDateInErrorState = startDateError === "" ? false : true;
    const isEndDateErrorState = endDateError === "" ? false : true;
    
    return {
        typeError: typeError,
        startDateError: startDateError,
        endDateError: endDateError,
        isTypeErrorInErrorState: isTypeInErrorState,
        isStartDateInErrorState: isStartDateInErrorState,
        isEndDateErrorState: isEndDateErrorState
    };
};

const checkForTypeErrors = (type: string): string => {
    if (type === "") {
        return "Type is empty.";
    }
    return "";
};

const checkForStartDateErrors = (interview: JobInterview): string => {
    if (interview.startDate > interview.endDate) {
        return "Start date is after end date.";
    }
    return "";
}

const checkForEndDateErrors = (interview: JobInterview): string => {
    if (interview.endDate < interview.startDate) {
        return "End date is before start date.";
    }
    return "";
};