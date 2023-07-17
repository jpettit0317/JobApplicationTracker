import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import axios from "axios";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";
import { Login } from "../../model/interfaces/login/Login";

export const loginUser = async (login: Login, url: string)
    : Promise<HttpResponse<string>>  => {
        if (isThereBadInput(login, url)) {
            return handleBadInput();
        }

        try {
            return makeLoginUserCall(login, url);
        } catch (error: any) {
            return handleErrorFromLoginUserCall(error);
        }
}

const makeLoginUserCall = async (login: Login, url: string)
    : Promise<HttpResponse<string>> => {
        const resp = await axios.post(url, login);

        const errorType = convertErrorTypeStringToErrorType(resp.data.errorType);
        
        const respData: HttpResponseData<string> = {
            data: resp.data.token as string,
            status: resp.data.statusCode as number,
            errorMessage: resp.data.errorMessage as string,
            errorType: errorType
        };

        return createHttpResponse(respData);
}

const isThereBadInput = (login: Login, url: string): boolean => {
    return url === "" || isLoginBad(login); 
}

const isLoginBad = (login: Login): boolean => {
    return login.email === "" ||
        login.password === "";
}

const handleBadInput = (): HttpResponse<string> => {
    const badInput: HttpResponseData<string> = {
        data: "",
        status: 404,
        errorMessage: "Email or password is empty.",
        errorType: HttpResponseErrorType.other
    };

    return createHttpResponse(badInput);
}

const handleErrorFromLoginUserCall = (error: any): HttpResponse<string> => {
    const errorString = error.message as string;
    
    const errorData: HttpResponseData<string> = {
        data: "",
        status: HttpStatusCodes.notFound,
        errorMessage: errorString,
        errorType: HttpResponseErrorType.other
    };

    return createHttpResponse(errorData);
}

const convertErrorTypeStringToErrorType = (input: any): HttpResponseErrorType => {
    const inputString = input as any;

    return getErrorTypeFromString(inputString);
}