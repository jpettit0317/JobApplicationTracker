import axios from "axios";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { JobApplication } from "../../model/interfaces/jobapp/JobApplication";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";

/*
TODO: Pass timezone
*/
export const getNewJobApps = async (token: string, url: string, dateLastChecked: string): Promise<HttpResponse<JobApplication[]>> => {
    if (token === "" || url === "" || dateLastChecked === "") {
        return handleBadInput();
    }
    const newURL = getNewJobAppsURL(token, url, dateLastChecked);

    return makeGetNewJobAppsCall(newURL);
}

const handleBadInput = (): HttpResponse<JobApplication[]> => {
    const errorResponse: HttpResponseData<JobApplication[]> = {
        data: [],
        status: 403,
        errorMessage: "Token or url is empty",
        errorType: HttpResponseErrorType.invalidInput
    }

    return createHttpResponse<JobApplication[]>(errorResponse);
}

const makeGetNewJobAppsCall = async (url: string): Promise<HttpResponse<JobApplication[]>> => {
    try {
        const resp = await axios.get(url);

        const errorType = getErrorTypeFromString(resp.data.errorType as string);
        const respData: HttpResponseData<JobApplication[]> = {
            data: resp.data.jobApps as JobApplication[],
            status: resp.data.statusCode as number,
            errorMessage: resp.data.errorMessage as string,
            errorType: errorType 
        };

        return createHttpResponse<JobApplication[]>(respData);
    } catch (error) {
        const respData: HttpResponseData<JobApplication[]> = {
            data: [],
            status: HttpStatusCodes.forbidden,
            errorMessage: error as string,
            errorType: HttpResponseErrorType.other 
        };

        return createHttpResponse<JobApplication[]>(respData);
    }
}

const getNewJobAppsURL = (token: string, url: string, dateLastChecked: string): string => {
    return `${url}?token=${token}&lastDateChecked=${dateLastChecked}`;
}