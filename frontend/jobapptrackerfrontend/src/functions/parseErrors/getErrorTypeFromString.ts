import { HttpResponseErrorType } from "../../enums/HttpResponseErrorTypes_enum";

export const getErrorTypeFromString = (input: string = ""): HttpResponseErrorType => {
    const errorMap = new Map<string, HttpResponseErrorType>([
        ["USER_EXISTS", HttpResponseErrorType.userExists],
        ["OTHER", HttpResponseErrorType.other],
        ["NONE", HttpResponseErrorType.none]
    ]);

    const result: HttpResponseErrorType | undefined = errorMap.get(input);

    if (result === undefined) {
        return HttpResponseErrorType.other;
    } else {
        return result;
    }
}