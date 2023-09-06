import axios from "axios";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { JobApplication, isJobApplicationEmpty } from "../../model/interfaces/jobapp/JobApplication";
import { JobInterview, isJobInterviewEmpty } from "../../model/interfaces/jobapp/JobInterview";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";
import { AddJobAppReq } from "../../model/interfaces/requests/AddJobAppReq";

export const addJobApp = async(jobApp: JobApplication, url: string, token: string): Promise<HttpResponse<string>> => {
    const resp = checkInvalidInput(url, token, jobApp);
    if (resp.statusCode > 201) {
        return resp;
    }

    try {
        return makeAddJobAppCall(url, token, jobApp);
    } catch (error: any) {
        return handleErrorFromAddJobAppCall(error);
    }
}

const checkInvalidInput = (url: string, token: string, jobApp: JobApplication): HttpResponse<string> => {
    if (url === "") {
        return handleBadInput(HttpStatusCodes.badRequest, "URL is empty.");
    } else if (token === "") {
        return handleBadInput(HttpStatusCodes.badRequest, "Token is empty.");
    } else if (isJobApplicationEmpty(jobApp)) {
        return handleBadInput(HttpStatusCodes.badRequest, "Job App is empty.");
    } else if (jobApp.interviews.length !== 0 && areInterviewsValid(jobApp.interviews)) {
        return handleBadInput(HttpStatusCodes.badRequest, "Job Interviews are empty.");
    } else {
        const respData: HttpResponseData<string> = {
            data: "",
            status: 200,
            errorMessage: "",
            errorType: HttpResponseErrorType.none
        };

        return createHttpResponse(respData);
    }
}

const areInterviewsValid = (interviews: JobInterview[]): boolean => {
    for (const interview of interviews) {
        if (isJobInterviewEmpty(interview)) {
            return true;
        }
    }
    return false;
}

const handleBadInput = (statusCode: HttpStatusCodes, reason: string = ""): HttpResponse<string> => {
    const respData: HttpResponseData<string> = {
        data: "",
        status: statusCode,
        errorMessage: reason,
        errorType: HttpResponseErrorType.other 
    };

    return createHttpResponse<string>(respData);
}

const makeAddJobAppCall = async (url: string, token: string, jobApp: JobApplication): Promise<HttpResponse<string>> => {
    const req: AddJobAppReq = {
        jobApp: jobApp,
        token: token
    };

    const resp = await axios.post(url, req);
    const errorType = convertErrorTypeStringToErrorType(resp.data.errorType);

    const respData: HttpResponseData<string> = {
        data: "",
        status: resp.data.statusCode as number,
        errorMessage: resp.data.errorMessage as string,
        errorType: errorType
    };

    return createHttpResponse<string>(respData);
}

const handleErrorFromAddJobAppCall = (error: any): HttpResponse<string> => {
    const errorString = error.message as string;
    
    const errorData: HttpResponseData<string> = {
        data: "",
        status: HttpStatusCodes.notFound,
        errorMessage: errorString,
        errorType: HttpResponseErrorType.other
    };

    return createHttpResponse<string>(errorData);
}

const convertErrorTypeStringToErrorType = (input: any): HttpResponseErrorType => {
    const inputString = input as string;
  
    return getErrorTypeFromString(inputString); 
}