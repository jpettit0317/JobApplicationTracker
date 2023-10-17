import { HttpStatusCode } from "axios";
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export type MockJestEditJobAppFunc = jest
    .Mock<Promise<HttpResponse<string>>,
    [token: string, url: string, updatedJobApp: JobApplication]>;

export const createResolvingEditJobApp = (): MockJestEditJobAppFunc => {
    const resp = new HttpResponseBuilder<string>("")
        .setErrorMessage("")
        .setErrorType(HttpResponseErrorType.none)
        .setStatusCode(HttpStatusCode.Ok)
        .build();

    return jest.fn(
        async (token: string, url: string, updatedJobApp: JobApplication): Promise<HttpResponse<string>> => {
            return Promise.resolve(resp);
        }
    )
};

export const createRejectingEditJobApp = (errorMessage: string,
    errorType: HttpResponseErrorType, statusCode: HttpStatusCode): MockJestEditJobAppFunc => {
    const resp = new HttpResponseBuilder<string>("")
        .setErrorMessage(errorMessage)
        .setErrorType(errorType)
        .setStatusCode(statusCode)
        .build();

    return jest.fn(
        async (token: string, url: string, updatedJobApp: JobApplication): Promise<HttpResponse<string>> => {
            return Promise.reject(resp);
        }
    )
}