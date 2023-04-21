import { HttpResponse } from "../../model/httpresponses/HttpResponse";
import { HttpResponseBuilder } from "../../model/builders/HttpResponseBuilder";
import { HttpResponseData } from "../../model/interfaces/init/ResponseData";

describe("HttpResponse unit tests", <T>() => {
    const assertIsError = (actualValue: boolean, expectedValue: boolean) => {
        expect(actualValue).toBe(expectedValue);
    }

    const assertResponsesAreEqual = (resp: HttpResponse<string[]>, respData: HttpResponseData<string[]>) => {
        expect(resp.data).toBe(respData.data);
        expect(resp.errorMessage).toBe(respData.errorMessage);
        expect(resp.statusCode).toBe(respData.status);
    }

    const createHttpResponse = (resp: HttpResponseData<string[]> 
        = {status: 0, errorMessage: "", data: []}): HttpResponse<string[]> => {
            return new HttpResponseBuilder<string[]>(resp.data)
                .setErrorMessage(resp.errorMessage)
                .setStatusCode(resp.status)
                .build();
    }
    
    describe("value tests", () => {
        test("when an HttpResponse has default values, then members should have values", () => {
            const defaultRespData: HttpResponseData<string[]> = {
                status: 0,
                errorMessage: "",
                data: []
            };
            const response = createHttpResponse(defaultRespData);

            assertResponsesAreEqual(response, defaultRespData);
        });

        test("when an HttpResponse has set values, then members should have values", () => {
            const respData: HttpResponseData<string[]> = {
                data: ["Hello", "World"],
                errorMessage: "Nothing",
                status: 200
            };
            const response = createHttpResponse(respData);
            
            assertResponsesAreEqual(response, respData);
        });
    });

    describe("isError tests", () => {
        test("an HttpResponse with status code less than 400, should return false", () => {
            const errorStatusCodes: number[] = [
                Number.MIN_SAFE_INTEGER,
                200,
                201,
                300,
                399
            ];

            for (const statusCode of errorStatusCodes) {
                const respData: HttpResponseData<string[]> = {
                    status: statusCode,
                    errorMessage: "",
                    data: []
                };
                const response = createHttpResponse(respData);
        
                const actualValue = response.isError();
                const expectedValue = false;

                assertIsError(actualValue, expectedValue);
            }
        });

        test("an HttpResponse with status code greater than 400, should return true", () => {
            const errorStatusCodes: number[] = [
                400,
                404,
                Number.MAX_SAFE_INTEGER
            ];

            for (let statusCode of errorStatusCodes) {
                const resData: HttpResponseData<string[]> = {
                    status: statusCode,
                    errorMessage: "Something bad happend.",
                    data: []
                };
                const response = createHttpResponse(resData);
                
                const actualValue = response.isError();
                const expectedValue = true;

                assertIsError(actualValue, expectedValue);
            }
        });
    });
});