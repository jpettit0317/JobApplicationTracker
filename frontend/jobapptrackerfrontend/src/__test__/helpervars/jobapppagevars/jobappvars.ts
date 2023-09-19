import { HttpStatusCode } from "axios";
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import { v4 as uuidv4 } from "uuid";
import { HttpStatusCodes } from "../../../enums/HttpStatusCodes_enum";

const jobApp1: JobApplication = {
    company: "Google",
    jobTitle: "Junior Software Engineer",
    description: "",
    status: "Accepted",
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [],
    dateModified: new Date()
};

const jobApp2: JobApplication = {
    company: "Facebook",
    jobTitle: "Junior Software Engineer",
    description: "",
    status: "Accepted",
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [],
    dateModified: new Date()
}; 

const jobApp3: JobApplication = {
    company: "Microsoft",
    jobTitle: "Junior Software Engineer",
    description: "",
    status: "Accepted",
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [],
    dateModified: new Date()
}; 

export const jobApps = [
    jobApp1,
    jobApp2
];

export const newJobApps = [
    jobApp3
];

export const validResponse: HttpResponse<JobApplication[]> =
    new HttpResponseBuilder<JobApplication[]>(jobApps)
        .setErrorMessage("")
        .setErrorType(HttpResponseErrorType.none)
        .setStatusCode(HttpStatusCodes.success)
        .build();

export const validGetNewJobAppResponse: HttpResponse<JobApplication[]> =
    new HttpResponseBuilder<JobApplication[]>(newJobApps)
        .setErrorMessage("")
        .setErrorType(HttpResponseErrorType.none)
        .setStatusCode(HttpStatusCodes.success)
        .build();
