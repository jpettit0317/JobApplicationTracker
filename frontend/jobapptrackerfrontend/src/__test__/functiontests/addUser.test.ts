import { addUser } from "../../functions/networkcalls/addUser";
import { SignUp } from "../../model/interfaces/signup/SignUp";
import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/HttpResponseData";
import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";

describe("addUser tests", () => {

    const assertResponseIsEqualToData = (resp: HttpResponse<string>, respData: HttpResponseData<string>) => {
        expect(resp.data).toBe(respData.data);
        expect(resp.errorMessage).toBe(respData.errorMessage);
        expect(resp.statusCode).toBe(respData.status);
    }

    const assertResponseIsEqualToResponse = (resps: HttpResponse<string>[] = []) => {
        const [actual, expected] = resps;

        expect(actual.data).toBe(expected.data);
        expect(actual.errorMessage).toBe(expected.errorMessage);
        expect(actual.statusCode).toBe(expected.statusCode);
    }

    test("when passed in an empty SignUp or empty url, should return error", () => {
        const emptySignUp: SignUp = {
            email: "",
            firstname: "",
            password: "",
            lastname: ""
        };
        const emptyUrl = "";

        addUser(emptySignUp, emptyUrl).then(resp => {
            const respData: HttpResponseData<string> = {
                data: "",
                errorMessage: "URL or signup is empty.",
                status: 404,
                errorType: HttpResponseErrorType.other
            };

            assertResponseIsEqualToData(resp, respData);
        })
    });
});