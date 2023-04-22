import { addUser } from "../../functions/networkcalls/addUser";
import { SignUp, SignUpConfirmPassword } from "../../model/interfaces/signup/SignUp";
import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseData } from "../../model/interfaces/init/ResponseData";
import { APIEndPoint } from "../../enums/APIEndPoint_enum";
import { HttpResponseBuilder } from "../../model/builders/HttpResponseBuilder";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes_enum";
import axios from "axios";

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

    const assertAxiosHasBeenCalledTimes = (timesCalled: number = 0) => {
        // expect(mockAxios).toBeCalledTimes(timesCalled);
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
                status: 404
            };

            assertResponseIsEqualToData(resp, respData);
        })
    });
});