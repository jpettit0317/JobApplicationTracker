import { JobInterview } from "./JobInterview";

export interface JobApplication {
    company: string;
    jobTitle: string;
    description: string;
    status: string;
    id: string;
    dateApplied: Date;
    interviews: JobInterview[];
    dateModified: Date;
}

export const isJobApplicationEmpty = (jobApp: JobApplication): boolean => {
    return jobApp.company === "" 
        || jobApp.jobTitle === "" || jobApp.status === "";
}

export const createJobApp = (company: string = "", jobTitle: string = "", description: string = "",
 status: string = "", id: string = "", dateApplied: Date = new Date(),
 dateModified: Date = new Date(), interviews: JobInterview[]) => {
    return {
        company: company,
        jobTitle: jobTitle,
        description: description,
        status: status,
        id: id,
        dateApplied: dateApplied,
        interviews: interviews,
        dateModified: dateModified
    };
}