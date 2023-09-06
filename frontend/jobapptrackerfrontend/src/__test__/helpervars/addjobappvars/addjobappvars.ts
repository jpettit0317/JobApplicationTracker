import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";
import {v4 as uuidv4} from 'uuid';
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { MockJestAddJobAppFunc } from "../../helperfunctions/types/MockJestAddJobAppFunc_type";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { HttpStatusCodes } from "../../../enums/HttpStatusCodes_enum";

const uuid = uuidv4();
const date1 = new Date('December 17, 1995 03:24:00');
const date2 = new Date('December 18, 1995 03:24:00');
const date3 = new Date('December 18, 1995 04:00:00');
const date4 = new Date('December 18, 2050 04:00:00');
const date5 = new Date('December 18, 2050 04:30:00');

export const jobInterview: JobInterview = {
    jobappid: uuid,
    id: uuidv4(),
    type: "Technical",
    startDate: date2,
    endDate: date3,
    location: ""
};

export const jobInterview2: JobInterview = {
    jobappid: uuid,
    id: uuidv4(),
    type: "Technical",
    startDate: date2,
    endDate: date3,
    location: ""
};

export const jobInterview3: JobInterview = {
    jobappid: uuid,
    id: uuidv4(),
    type: "Behavioral",
    startDate: date4,
    endDate: date5,
    location: "online"
};

export const errorJobInterview: JobInterview = {
    jobappid: uuid,
    id: uuidv4(),
    type: "Technical",
    location: "Online",
    startDate: date5,
    endDate: date4
};

export const jobInterviewUUID: JobInterview = {
    jobappid: uuid,
    id: uuidv4(),
    type: uuidv4(),
    location: uuidv4(),
    startDate: date4,
    endDate: date5   
};

export const noInterviewJobApp: JobApplication = {
    company: "Google",
    jobTitle: "Junior Software Engineer",
    description: "Job",
    status: "Pending",
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [],
    dateModified: new Date()
};

export const jobAppWithInterview: JobApplication = {
    company: "Apple",
    jobTitle: "Junior Software Engineer",
    description: "Job",
    status: "Accepted",
    id: uuidv4(),
    dateApplied: date1,
    interviews: [jobInterview],
    dateModified: new Date()
};

export const jobAppWithInterview2: JobApplication = {
    company: "Amazon",
    jobTitle: "Junior Software Engineer",
    description: "",
    status: "Accepted",
    id: uuidv4(),
    dateApplied: date1,
    interviews: [jobInterview3],
    dateModified: new Date()   
};

export const errorJobAppWithInterview: JobApplication = {
    company: "",
    jobTitle: "",
    description: "",
    status: "",
    id: uuidv4(),
    dateApplied: new Date(),
    interviews: [jobInterview2],
    dateModified: new Date()
};

export const createResolvingMockFunction = (resp: HttpResponse<string>): MockJestAddJobAppFunc => {
    return jest.fn(async (jobApp: JobApplication, url: string, token: string)
        : Promise<HttpResponse<string>> => Promise.resolve(resp));
}

export const createRejectingMockFunction = (reason: string): MockJestAddJobAppFunc => {
    return jest.fn(async (jobApp: JobApplication, url: string, token: string)
        : Promise<HttpResponse<string>> => Promise.reject(reason));
}

export const validHttpResponse = new HttpResponseBuilder("")
    .setErrorMessage("")
    .setStatusCode(HttpStatusCodes.success)
    .build();

export const invalidHttpResponse = new HttpResponseBuilder("")
    .setErrorMessage("Error!!!")
    .setStatusCode(HttpStatusCodes.forbidden)
    .build();