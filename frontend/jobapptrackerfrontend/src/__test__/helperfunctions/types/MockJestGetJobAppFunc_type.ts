import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";


export type MockJestGetAllJobAppFunc = jest.Mock<Promise<HttpResponse<JobApplication[]>>,
 [token: string, url: string]>;

 export type MockJestGetNewJobAppFunc = jest.Mock<Promise<HttpResponse<JobApplication[]>>,
 [token: string, url: string, dateLastChecked: string]>;

export const createResolvingGetAllJobAppFunc = (resp: HttpResponse<JobApplication[]>): MockJestGetAllJobAppFunc => {
    return jest.fn(
        async (token: string, url: string): Promise<HttpResponse<JobApplication[]>> => { 
            console.log("The token is " + token + " URL = " + url);
            return Promise.resolve(resp)
        }
    );
}

export const createRejectingGetAllJobAppFunc = (resp: HttpResponse<JobApplication[]>): MockJestGetAllJobAppFunc => {
    return jest.fn(
        async (token: string, url: string): Promise<HttpResponse<JobApplication[]>> => Promise.reject(resp.errorMessage)
    );
}

export const createResolvingGetNewJobAppFunc = (resp: HttpResponse<JobApplication[]>): MockJestGetNewJobAppFunc => {
    return jest.fn(
        async (token: string, url: string, dateLastChecked: string): Promise<HttpResponse<JobApplication[]>> => Promise.resolve(resp)
    );
}

export const createRejectingGetNewJobAppFunc = (resp: HttpResponse<JobApplication[]>): MockJestGetNewJobAppFunc => {
    return jest.fn(
        async (token: string, url: string, dateLastChecked: string): Promise<HttpResponse<JobApplication[]>> => Promise.reject(resp.errorMessage)
    );
}
