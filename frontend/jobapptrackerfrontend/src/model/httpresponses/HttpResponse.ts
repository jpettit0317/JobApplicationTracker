import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { HttpResponseBuilder } from "../builders/HttpResponseBuilder";
import { HttpResponseData } from "../interfaces/init/HttpResponseData";

export class HttpResponse<T> {
    readonly data: T;
    readonly statusCode: number;
    readonly errorMessage: string;
    readonly errorType: HttpResponseErrorType;

    protected constructor(newData: HttpResponseData<T>) {
            this.data = newData.data
            this.statusCode = newData.status;
            this.errorMessage = newData.errorMessage;
            this.errorType = newData.errorType;
    }

    public static createResponse = <T>(newData: HttpResponseData<T>)
        : HttpResponse<T> => {
        return new HttpResponse<T>(newData);
    }

    public isError = (): boolean => {
        return this.statusCode >= 400;
    }

    public isErrorOfType = (errorType: HttpResponseErrorType): boolean => {
        return this.errorType === errorType;
    }
}

export const createHttpResponse = <T>(data: HttpResponseData<T>): HttpResponse<T> => {
    return new HttpResponseBuilder<T>(data.data)
        .setErrorMessage(data.errorMessage)
        .setErrorType(data.errorType)
        .setStatusCode(data.status)
        .build();
}