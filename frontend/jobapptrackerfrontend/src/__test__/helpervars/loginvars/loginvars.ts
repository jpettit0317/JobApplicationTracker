import { Login } from "../../../model/interfaces/login/Login";
import { MockJestLoginFunc } from "../../helperfunctions/types/MockJestLoginFunc_type";
import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { HttpResponseBuilder } from "../../../model/builders/HttpResponseBuilder";
import { HttpStatusCodes } from "../../../enums/HttpStatusCodes_enum";

export const loginRoute = "/login";
    
export const validLogins: Login[] = [
    { 
        email: "nonameman@email.com",
        password: "password0q4r;t"
    },
    {
        email: "nonameman@email.com",
        password: "hello:world+=;"
    }
];

export const invalidLogins: Login[] = [
    {
        email: "HelloWorld🤣",
        password: "HelloWorld🤣;"   
    },
    {
        email: "nonameman@email.com",
        password: "hello world!"
    }
];

export const createResolvingMockFunction = (resp: HttpResponse<string>): MockJestLoginFunc => {
    return jest.fn(async (login: Login, url: string)
        : Promise<HttpResponse<string>> => Promise.resolve(resp));
}

export const createRejectingMockFunction = (reason: string): MockJestLoginFunc => {
    return jest.fn(async (login: Login, url: string)
        : Promise<HttpResponse<string>> => Promise.reject(reason));
}

export const validHttpResponse = new HttpResponseBuilder("Token")
    .setErrorMessage("")
    .setStatusCode(HttpStatusCodes.success)
    .build();

export const invalidHttpResponse = new HttpResponseBuilder("")
    .setErrorMessage("Error!!!")
    .setStatusCode(HttpStatusCodes.forbidden)
    .build();