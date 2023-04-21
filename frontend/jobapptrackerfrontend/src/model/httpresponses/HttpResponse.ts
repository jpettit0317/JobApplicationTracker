import { HttpResponseData } from "../interfaces/init/ResponseData";

export class HttpResponse<T> {
    readonly data: T;
    readonly statusCode: number;
    readonly errorMessage: string;

    public constructor(newData: HttpResponseData<T>) {
            this.data = newData.data
            this.statusCode = newData.status;
            this.errorMessage = newData.errorMessage;
    }

    public static createResponse = <T>(newData: HttpResponseData<T>)
        : HttpResponse<T> => {
        return new HttpResponse<T>(newData);
    }

    public isError = (): boolean => {
        return this.statusCode >= 400;
    }
}