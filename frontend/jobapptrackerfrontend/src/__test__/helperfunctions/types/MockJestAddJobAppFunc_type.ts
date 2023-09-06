import { HttpResponse } from "../../../model/httpresponses/HttpResponse";
import { JobApplication } from "../../../model/interfaces/jobapp/JobApplication";

export type MockJestAddJobAppFunc = jest.Mock<Promise<HttpResponse<string>>,
 [jobApp: JobApplication, url: string, token: string]>;