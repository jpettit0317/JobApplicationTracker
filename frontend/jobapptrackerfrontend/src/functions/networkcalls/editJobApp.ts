import axios from "axios";
import { JobApplication } from "../../model/interfaces/jobapp/JobApplication";
import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { EditJobAppReq } from "../../model/interfaces/requests/EditJobAppReq";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";


export const editJobApp = async (token: string, url: string, updatedJobApp: JobApplication): Promise<HttpResponse<string>> => {
    if (token === "" || url === "") {
        return handleBadInput();
    }

    const editJobAppReq: EditJobAppReq = {
        token: token,
        updatedJobApp: updatedJobApp
    };

    return makeEditJobAppCall(editJobAppReq, url);
}

const handleBadInput = (): HttpResponse<string> => {
    const errorResponse: HttpResponseData<string> = {
        data: "",
        status: 403,
        errorMessage: "Token or url is empty.",
        errorType: HttpResponseErrorType.invalidInput
    };

    return createHttpResponse<string>(errorResponse);
}

const makeEditJobAppCall = async (editJobAppReq: EditJobAppReq, url: string): Promise<HttpResponse<string>> => {
    try {
        const resp = await axios.put(url, editJobAppReq);
        const errorType = getErrorTypeFromString(resp.data.errorType as string);

        const respData: HttpResponseData<string> = {
            data: "",
            status: resp.data.statusCode as number,
            errorMessage: resp.data.errorMessage as string,
            errorType: errorType
        };

        return createHttpResponse<string>(respData);
    } catch (error) {
        const respData: HttpResponseData<string> = {
            data: "",
            status: HttpStatusCodes.forbidden,
            errorMessage: error as string,
            errorType: HttpResponseErrorType.other
        };

        return createHttpResponse<string>(respData);
    }
}