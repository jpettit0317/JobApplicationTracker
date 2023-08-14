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