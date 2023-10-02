import { HttpStatusCode } from "axios";
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export type MockGetJobAppByIdFunc = jest.Mock<Promise<HttpResponse<JobApplication>>, [baseURL: string, token: string, id: string]>;

export const createResolvingGetOneJobAppFunc = (jobApplication: JobApplication): MockGetJobAppByIdFunc => {
    const resp = new HttpResponseBuilder<JobApplication>(jobApplication)
        .setErrorMessage("")
        .setErrorType(HttpResponseErrorType.none)
        .setStatusCode(HttpStatusCode.Ok)
        .build();

    return jest.fn(
        async (baseURL: string, id: string, token: string): Promise<HttpResponse<JobApplication>> => {
            return Promise.resolve(resp);
        }
    );
}

export const createRejectingGetOneJobAppFunc = (reason: string): MockGetJobAppByIdFunc => {
    const jobApp: JobApplication = {
        company: "",
        jobTitle: "",
        description: "",
        status: "",
        id: "",
        dateApplied: new Date(),
        interviews: [],
        dateModified: new Date()
    };
    
    const resp = new HttpResponseBuilder<JobApplication>(jobApp)
        .setErrorMessage(reason)
        .setErrorType(HttpResponseErrorType.other)
        .setStatusCode(HttpStatusCode.NotFound)
        .build();

    return jest.fn(
        async (baseURL: string, id: string, token: string): Promise<HttpResponse<JobApplication>> => {
            return Promise.reject(reason);
        }
    );
}