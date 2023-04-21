
export interface HttpResponseData<T> {
    data: T,
    status: number,
    errorMessage: string
};