
export class HttpResponse<T> {
    readonly data: T;
    readonly statusCode: number;
    readonly errorMessage: string;

    private constructor(newData: T,
        newStatusCode: number = 0, errorMessage: string = "") {
            this.data = newData;
            this.statusCode = newStatusCode;
            this.errorMessage = errorMessage;
    }

    public static createResponse<T>(data: T, statusCode: number = 0, errorMessage: string = ""): HttpResponse<T> {
        return new HttpResponse<T>(data, statusCode, errorMessage);
    }

    public isError = (): boolean => {
        return this.statusCode >= 400;
    }
}

export class HttpResponseBuilder<T> {
    private data: T;
    private statusCode: number = 0;
    private errorMessage: string = "";

    constructor(data: T) {
        this.data = data;
    }

    public setData(newData: T): HttpResponseBuilder<T> {
        this.data = newData;
        return this;
    }

    public setStatusCode(newStatusCode: number = 0): HttpResponseBuilder<T> {
        this.statusCode = newStatusCode;
        return this;
    }

    public setErrorMessage(newErrorMessage: string = ""): HttpResponseBuilder<T> {
        this.errorMessage = newErrorMessage;
        return this;
    }

    public build(): HttpResponse<T> {
        return HttpResponse.createResponse<T>(
            this.data,
            this.statusCode,
            this.errorMessage
        );
    }
    
}