import { HttpResponseErrorType } from "../../../enums/HttpResponseErrorTypes_enum";

export interface HttpResponseData<T> {
    data: T,
    status: number,
    errorMessage: string,
    errorType: HttpResponseErrorType
};