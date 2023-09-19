import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { JobApplication } from "../../model/interfaces/jobapp/JobApplication";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import axios from "axios";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";

/*
TODO: Add timezone
*/
export const getAllJobApps = async (token: string = "", url: string): Promise<HttpResponse<JobApplication[]>> => {
    if (token === "" || url === "") {
        return handleBadInput();
    }
    const getAllJobAppsURL = getAllJobsURL(token, url);

    return makeGetAllJobAppsCall(token, getAllJobAppsURL);
}

const handleBadInput = (): HttpResponse<JobApplication[]> => {
    const errorResponse: HttpResponseData<JobApplication[]> = {
        data: [],
        status: 403,
        errorMessage: "Token or url is empty",
        errorType: HttpResponseErrorType.invalidInput
    }

    return createHttpResponse<JobApplication[]>(errorResponse);
};

const makeGetAllJobAppsCall = async (token: string, url: string): Promise<HttpResponse<JobApplication[]>> => {
    const resp = await axios.get(url);

    const errorType = getErrorTypeFromString(resp.data.errorType as string);

    const respData: HttpResponseData<JobApplication[]> = {
        data: resp.data.jobApps as JobApplication[],
        status: resp.data.statusCode as number,
        errorMessage: resp.data.errorMessage as string,
        errorType: errorType 
    };

    return createHttpResponse(respData);
}

const getAllJobsURL = (token: string, url: string): string => {
    return `${url}?token=${token}`;
}