import { ApiResponseStatus } from "./ApiResponseStatus";
import { ApiResponse } from "./ApiResponse";
import { ErrorBuilder } from "./ErrorBuilder";
import { IApiError } from "./IApiError";
import { RequestInitBuilder } from "./RequestInitBuilder";

export abstract class ApiBase {
    private static url(url: string) {
        if (url.startsWith("http")) {
            return url;
        }
        return `${process.env.API_BASE_URL}${url}`;
    }

    protected static async get<TResponseData = any>(url: string): Promise<ApiResponse<TResponseData>> {
        const requestUrl = this.url(url);
        const requestOptions = new RequestInitBuilder("GET").build();
        const response = await fetch(requestUrl, requestOptions);

        return this.createResponse<TResponseData>(response);
    }

    protected static async post<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        const requestUrl = this.url(url);
        const requestOptions = new RequestInitBuilder("POST").appendJson(dto).build();
        const response: Response = await fetch(requestUrl, requestOptions);

        return this.createResponse<TResponseData>(response);
    }

    protected static async put<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        const requestUrl = this.url(url);
        const requestOptions = new RequestInitBuilder("PUT").appendJson(dto).build();
        const response: Response = await fetch(requestUrl, requestOptions);

        return this.createResponse<TResponseData>(response);
    }

    protected static async patch<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        const requestUrl = this.url(url);
        const requestOptions = new RequestInitBuilder("PATCH").appendJson(dto).build();
        const response: Response = await fetch(requestUrl, requestOptions);

        return this.createResponse<TResponseData>(response);
    }

    protected static async delete<TResponseData = any>(url: string, dto?: any): Promise<ApiResponse<TResponseData>> {
        const requestUrl = this.url(url);
        const builder = new RequestInitBuilder("DELETE");
        if (dto) {
            builder.appendJson(dto);
        }
        const requestOptions = builder.build();

        const response: Response = await fetch(requestUrl, requestOptions);
        return this.createResponse<TResponseData>(response);
    }

    private static async createResponse<TResponseData>(response: Response): Promise<ApiResponse<TResponseData>> {
        const apiResponse = new ApiResponse<TResponseData>();
        apiResponse.statusCode = response.status;

        if (response.ok) {
            if (response.status !== ApiResponseStatus.NoContent) {
                apiResponse.data = await response.json();
            }
        }
        else if (this.isApiError(response)) {
            const apiError: IApiError = await response.json();
            apiResponse.error = ErrorBuilder.getErrorMessage(apiError);
        }
        else {
            apiResponse.error = await response.text();
        }

        return apiResponse;
    }

    private static isApiError(response: Response): boolean {
        return response.headers.has("Content-Type")
            && response.headers.get("Content-Type").indexOf("application/problem+json") > -1;
    }
}
