import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { SignUp } from "../../model/interfaces/signup/SignUp";
import axios from "axios";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import { HttpResponseBuilder } from "../../model/builders/HttpResponseBuilder";

export const addUser = async (signUp: SignUp, url: string): Promise<HttpResponse<string>> => {
  try {
    const resp = await axios.post<string>(url, signUp);
    console.log("Response data is ", resp.data);
    
    const addUserResponse = {
      data: resp.data,
      statusCode: resp.status,
      errorMessage: ""
    };

    return createResponse(addUserResponse);

  } catch (error: any) {
    const errorString = error.message as string;

    return new HttpResponseBuilder<string>("")
      .setStatusCode(HttpStatusCodes.notFound)
      .setErrorMessage(errorString)
      .build();
  }
}

export const createResponse = (resp: {data: string, statusCode: number, errorMessage: string} 
  = {data: "", statusCode: 0, errorMessage: ""}): HttpResponse<string> => {
    return new HttpResponseBuilder<string>(resp.data)
      .setErrorMessage(resp.errorMessage)
      .setStatusCode(resp.statusCode)
      .build();
}