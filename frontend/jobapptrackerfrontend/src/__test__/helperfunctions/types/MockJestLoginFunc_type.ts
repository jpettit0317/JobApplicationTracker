import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { Login } from "../../../model/interfaces/login/Login";

export type MockJestLoginFunc = jest.Mock<Promise<HttpResponse<string>>, [login: Login, url: string]>;