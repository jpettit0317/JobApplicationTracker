import { HttpStatusCode } from "axios"
import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum"
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder"
import { HttpResponse } from "../../../model/httpresponses/HttpResponse"
import { HttpStatusCodes } from "../../../enums/HttpStatusCodes_enum"

export type MockJestDeleteJobAppFunc = jest.Mock<Promise<HttpResponse<string>>,
 [baseURL: string, id: string, token: string]>
 
export const createResolvingDeleteJobApp = (): MockJestDeleteJobAppFunc => {
    const resp = new HttpResponseBuilder<string>("")
        .setErrorMessage("")
        .setErrorType(HttpResponseErrorType.none)
        .setStatusCode(HttpStatusCode.Ok)
        .build();
    
    return jest.fn(
        async (baseURL: string, id: string, token: string): Promise<HttpResponse<string>> => { 
            return Promise.resolve(resp);
        }
    );
}

export const createRejectingDeleteJobApp = (errorMessage: string, errorType: HttpResponseErrorType,
    statusCode: HttpStatusCode): MockJestDeleteJobAppFunc => {
        const resp = new HttpResponseBuilder<string>("")
        .setErrorMessage(errorMessage)
        .setErrorType(errorType)
        .setStatusCode(statusCode)
        .build(); 
 
        return jest.fn(
            async (baseURL: string, id: string, token: string): Promise<HttpResponse<string>> => { 
                return Promise.reject(resp.errorMessage);
            }
        );
}