import { HttpResponse, createHttpResponse } from "../../model/httpresponses/HttpResponse";
import { SignUp } from "../../model/interfaces/signup/SignUp";
import axios from "axios";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { getErrorTypeFromString } from "../parseErrors/getErrorTypeFromString";
import { isSignUpEmpty } from "../../model/interfaces/signup/SignUp";

export const addUser = async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => {
  if (url === "" || isSignUpEmpty(signUp)) {
    handleBadInput(); 
  }

  try {
    return makeAddUserCall(url, signUp);
  } catch (error: any) {
    return handleErrorFromAddUserCall(error); 
  }
}

const makeAddUserCall = async (url: string, signUp: SignUp): Promise<HttpResponse<string>> => {
  const resp = await axios.post(url, signUp);
    console.log("\n\n\nResponse data is ", resp.data);

    const errorType = convertErrorTypeStringToErrorType(resp.data.errorType);

    const respData: HttpResponseData<string> = {
      data: resp.data.token as string,
      status: resp.data.statusCode as number,
      errorMessage: resp.data.errorMessage as string,
      errorType: errorType 
    };

    return createHttpResponse<string>(respData);
}

const handleErrorFromAddUserCall = (error: any): HttpResponse<string> => {
  const errorString = error.message as string;

  const errorData: HttpResponseData<string> = {
    data: "",
    status: HttpStatusCodes.notFound,
    errorMessage: errorString,
    errorType: HttpResponseErrorType.other
  };

  return createHttpResponse<string>(errorData);
}

const handleBadInput = (): HttpResponse<string> => {
  const badInput: HttpResponseData<string> = {
    data: "",
    status: 404,
    errorMessage: "URL or signup is empty.",
    errorType: HttpResponseErrorType.other
  };

  return createHttpResponse<string>(badInput);
}

const convertErrorTypeStringToErrorType = (input: any): HttpResponseErrorType => {
  const inputString = input as string;

  return getErrorTypeFromString(inputString); 
}