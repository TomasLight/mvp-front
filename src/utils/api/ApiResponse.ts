import { Translate } from "../translates";
import { ApiResponseStatus } from "./ApiResponseStatus";

export class ApiResponse<TResponseData = any> {
    statusCode: ApiResponseStatus;
    data: TResponseData;
    error: string;

    constructor() {
        this.statusCode = null;
        this.data = null;

        Object.defineProperty(this, nameof<ApiResponse>(o => o.error), {
            set(value: any) {
                this["_error"] = value;
            },
            get(): any {
                let error = this["_error"];
                if (!error && this.hasError()) {
                    error = Translate.getString("api", { code: this.statusCode });
                }
                return error;
            },
        });
    }

    hasError() {
        return this.statusCode >= ApiResponseStatus.BadRequest;
    }

    hasClientError() {
        return this.hasError()
            && this.statusCode < ApiResponseStatus.InternalServerError
            && !this.hasTimeoutError();
    }

    hasTimeoutError() {
        return this.hasError()
            && this.statusCode === ApiResponseStatus.RequestTimeout;
    }
}
