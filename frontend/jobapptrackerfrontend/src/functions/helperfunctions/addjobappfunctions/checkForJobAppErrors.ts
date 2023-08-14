import { AddJobAppErrors } from "../../../model/interfaces/jobapp/AddJobAppErrors";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";


type JobAppError = {
    error: string;
    isInErrorState: boolean;
}

export const emptyCompanyError = "Company name is empty.";
export const emptyJobTitleError = "Job title is empty.";
export const emptyStatusError = "Status is empty.";
export const dateAppliedIsAfterJobInterview = "Job application date is after interview date.";

export const checkForJobAppErrors = (app: JobApplication): AddJobAppErrors => {
    const companyError = checkForCompanyError(app);
    const jobTitleError = checkForJobTitleError(app);
    const statusError = checkForStatusError(app);
    const dateAppliedError = checkForDateAppliedError(app);

    let jobAppErrors: AddJobAppErrors = {
        companyError: companyError.error,
        isCompanyInErrorState: companyError.isInErrorState,
        jobTitleError: jobTitleError.error,
        isJobTitleInErrorState: jobTitleError.isInErrorState,
        descriptionError: "",
        isDescriptionInErrorState: false,
        statusError: statusError.error,
        isStatusErrorInErrorState: statusError.isInErrorState,
        isDateAppliedInErrorState: dateAppliedError.isInErrorState,
        dateAppliedError: dateAppliedError.error
    };

    return jobAppErrors;
}

const checkForCompanyError = (app: JobApplication): JobAppError => {
    return app.company !== "" ? {error: "", isInErrorState: false} 
        : {error: emptyCompanyError, isInErrorState: true};
}

const checkForJobTitleError = (app: JobApplication): JobAppError => {
    return app.jobTitle !== "" ? {error: "", isInErrorState: false} 
        : {error: emptyJobTitleError, isInErrorState: true};
}

const checkForStatusError = (app: JobApplication): JobAppError => {
    return app.status !== "" ? {error: "", isInErrorState: false} 
        : {error: emptyStatusError, isInErrorState: true}; 
}

const checkForDateAppliedError = (app: JobApplication): JobAppError => {
    if (app.interviews.length === 0) {
        return {error: "", isInErrorState: false};
    } else {
        for (const interview of app.interviews) {
            if (interview.startDate < app.dateApplied) {
                return {error: dateAppliedIsAfterJobInterview, isInErrorState: true};
            }
        }
        return {error: "", isInErrorState: false};
    }
}

