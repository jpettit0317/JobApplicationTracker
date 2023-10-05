import { JobApplication } from "../jobapp/JobApplication";

export interface EditJobAppReq {
    updatedJobApp: JobApplication;
    token: string;
}