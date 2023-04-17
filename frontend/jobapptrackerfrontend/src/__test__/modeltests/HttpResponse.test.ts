import { HttpResponse, HttpResponseBuilder } from "../../model/httpresponses/HttpResponse";

describe("HttpResponse unit tests", <T>() => {
    const assertIsError = (actualValue: boolean, expectedValue: boolean) => {
        expect(actualValue).toBe(expectedValue);
    }

    const assertResponsesAreEqual = (response: HttpResponse<string[]>, data: string[], statusCode: number, errorMessage: string) => {
        expect(response.data).toBe(data);
        expect(response.errorMessage).toBe(errorMessage);
        expect(response.statusCode).toBe(statusCode);
    }
    
    describe("value tests", () => {
        test("when an HttpResponse has default values, then members should have values", () => {
            const defaultData: string[] = [];
            const defaultErrorMessage: string = "";
            const defaultStatusCode: number = 0;

            const response = new HttpResponseBuilder<string[]>(defaultData)
                .setErrorMessage(defaultErrorMessage)
                .setStatusCode(defaultStatusCode)
                .build();
            
            assertResponsesAreEqual(response, defaultData, defaultStatusCode, defaultErrorMessage);
        });

        test("when an HttpResponse has set values, then members should have values", () => {
            const defaultData: string[] = ["Hello", "World"];
            const defaultErrorMessage: string = "Nothing";
            const defaultStatusCode: number = 200;

            const response = new HttpResponseBuilder<string[]>(defaultData)
                .setErrorMessage(defaultErrorMessage)
                .setStatusCode(defaultStatusCode)
                .build();
            
            assertResponsesAreEqual(response, defaultData, defaultStatusCode, defaultErrorMessage);
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
                const response = new HttpResponseBuilder<string[]>([])
                    .setErrorMessage("")
                    .setStatusCode(statusCode)
                    .build();
        
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
                const response = new HttpResponseBuilder<string[]>([])
                    .setErrorMessage("Something bad happened.")
                    .setStatusCode(statusCode)
                    .build();
                
                const actualValue = response.isError();
                const expectedValue = true;

                assertIsError(actualValue, expectedValue);
            }
        });
    });
});