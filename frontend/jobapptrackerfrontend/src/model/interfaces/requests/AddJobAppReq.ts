import { JobApplication } from "../jobapp/JobApplication";
import { JobInterview } from "../jobapp/JobInterview";

export interface AddJobAppReq {
    jobApp: JobApplication
    token: string;
};