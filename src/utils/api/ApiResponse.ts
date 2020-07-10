import { ApiResponseStatus } from "./ApiResponseStatus";

export class ApiResponse<TResponseData = any> {
    statusCode: ApiResponseStatus;
    data: TResponseData;
    error: string;

    constructor() {
        this.statusCode = null;
        this.data = null;
        this.error = "";
    }

    hasError() {
        return Boolean(this.error);
    }

    hasClientError() {
        return this.hasError()
            && this.statusCode >= ApiResponseStatus.BadRequest
            && this.statusCode < ApiResponseStatus.InternalServerError
            && !this.hasTimeoutError();
    }

    hasTimeoutError() {
        return this.hasError()
            && this.statusCode === ApiResponseStatus.RequestTimeout;
    }
}
