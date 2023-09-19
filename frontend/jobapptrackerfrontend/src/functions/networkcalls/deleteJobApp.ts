import axios from "axios";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";

export const deleteJobApp = (baseUrl: string, id: string, token: string): Promise<HttpResponse<string>> => {
    if (baseUrl === "" || id === "") {
        return createBadResponse("URL or id is empty.");
    }

    const deleteJobAppURL = getDeleteJobAppURL(baseUrl, id, token);

    return makeDeleteJobAppCall(deleteJobAppURL);
}

const createBadResponse = async (reason: string): Promise<HttpResponse<string>> => {
    const httpResponseData: HttpResponseData<string> = {
        data: "",
        errorMessage: reason,
        errorType: HttpResponseErrorType.other,
        status: HttpStatusCodes.badRequest
    };

    return createHttpResponse<string>(httpResponseData);
}

const makeDeleteJobAppCall = async (url: string): Promise<HttpResponse<string>> => {
    try {
        const resp = await axios.delete(url);

        const errorType = getErrorTypeFromString(resp.data.errorType);

        const respData: HttpResponseData<string> = {
            data: "",
            status: resp.data.statusCode,
            errorMessage: resp.data.errorMessage,
            errorType: errorType
        };

        return createHttpResponse<string>(respData);
    } catch(error) {
        return createBadResponse(error as string);
    }
}

const getDeleteJobAppURL = (url: string, id: string, token: string): string => {
    return `${url}?id=${id}&token=${token}`;
}