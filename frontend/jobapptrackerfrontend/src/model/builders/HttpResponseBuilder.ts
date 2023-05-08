import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";
import { HttpResponse } from "../httpresponses/HttpResponse";
import { HttpResponseData } from "../interfaces/init/HttpResponseData";

export class HttpResponseBuilder<T> {
    private data: T;
    private statusCode: number = 0;
    private errorMessage: string = "";
    private errorType: HttpResponseErrorType = HttpResponseErrorType.other;

    constructor(data: T) {
        this.data = data;
    }

    public setData = (data: T): HttpResponseBuilder<T> => {
        this.data = data;
        return this;    
    }
    public setStatusCode = (newStatusCode: number = 0): HttpResponseBuilder<T> => {
        this.statusCode = newStatusCode;
        return this;
    }

    public setErrorMessage = (newErrorMessage: string = "")
        : HttpResponseBuilder<T> => {
        this.errorMessage = newErrorMessage;
        return this;
    }

    public setErrorType = (newErrorType: HttpResponseErrorType 
        = HttpResponseErrorType.other): HttpResponseBuilder<T> => {
            this.errorType = newErrorType;
            return this;
    }

    public build = (): HttpResponse<T> => {
        const resp: HttpResponseData<T> = {
            data: this.data,
            status: this.statusCode,
            errorMessage: this.errorMessage,
            errorType: this.errorType
        };
        return HttpResponse.createResponse<T>(resp);
    }
}