import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { JobApplication, createJobApp } from "../../model/interfaces/jobapp/JobApplication";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import axios from "axios";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";

export const getOneJobApp = async (baseURL: string = "", token: string = "", id: string = ""): Promise<HttpResponse<JobApplication>> => {
    if (baseURL === "" || token === "" || id === "") {
        return getBadResponse("URL, id, or token is empty.");
    }
    const url = getOneJobAppURL(baseURL, token, id);

    return makeGetOneJobAppCall(url);
}

const getBadResponse = (reason: string = ""): HttpResponse<JobApplication> => {
    const data = createJobApp("", "", "", "", "", new Date(), new Date(), []);

    const httpResponseData: HttpResponseData<JobApplication> = {
        errorMessage: reason,
        errorType: HttpResponseErrorType.other,
        status: HttpStatusCodes.forbidden,
        data: data
    };

    return createHttpResponse<JobApplication>(httpResponseData);
}

const makeGetOneJobAppCall = async (url: string): Promise<HttpResponse<JobApplication>> => {
    try {
        const resp = await axios.get(url);

        const errorType = getErrorTypeFromString(resp.data.errorType as string);

        const data: HttpResponseData<JobApplication> = {
            errorMessage: resp.data.errorMessage as string,
            status: resp.data.statusCode as number,
            errorType: errorType,
            data: resp.data.jobApp as JobApplication 
        };

        return createHttpResponse<JobApplication>(data);

    } catch (error) {
        console.log("Error is " + error as string);
        return getBadResponse("Something went wrong!!");
    }
}

export const getOneJobAppURL = (url: string, token: string, id: string): string => {
    return `${url}?token=${token}&id=${id}`;
}