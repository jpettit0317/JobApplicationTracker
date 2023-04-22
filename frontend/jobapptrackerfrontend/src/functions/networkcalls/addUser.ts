import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { SignUp } from "../../model/interfaces/signup/SignUp";
import axios from "axios";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponseBuilder } from "../../model/builders/HttpResponseBuilder";
import { HttpResponseData } from "../../model/interfaces/init/ResponseData";

export const addUser = async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => {
  if (url === "" || isSignUpEmpty(signUp)) {
    const badInput: HttpResponseData<string> = {
      data: "",
      status: 404,
      errorMessage: "URL or signup is empty."
    };

    return createResponse(badInput);
  }

  try {
    const resp = await axios.post(url, signUp);
    console.log("\n\n\nResponse data is ", resp.data);

    const respData: HttpResponseData<string> = {
      data: resp.data.token as string,
      status: resp.data.statusCode,
      errorMessage: resp.data.errorMessage
    };

    return createResponse(respData);

  } catch (error: any) {
    const errorString = error.message as string;

    return new HttpResponseBuilder<string>("")
      .setStatusCode(HttpStatusCodes.notFound)
      .setErrorMessage(errorString)
      .build();
  }
}

const isSignUpEmpty = (signUp: SignUp): boolean => {
  return signUp.email === "" 
    || signUp.firstname === "" || signUp.lastname === ""
    || signUp.password === "";
}

export const createResponse = (resp: HttpResponseData<string>): HttpResponse<string> => {
    return new HttpResponseBuilder<string>(resp.data)
      .setErrorMessage(resp.errorMessage)
      .setStatusCode(resp.status)
      .build();
}

const createResponseFromJSON = (input: string): HttpResponse<string> => {
  const data = JSON.parse(input);

  const token = data.data.token as string;
  const statusCode = data.data.statusCode as number;
  const errorMessage = data.data.errorMessage as string;

  return new HttpResponseBuilder<string>(token)
    .setErrorMessage(errorMessage)
    .setStatusCode(statusCode)
    .build();
};