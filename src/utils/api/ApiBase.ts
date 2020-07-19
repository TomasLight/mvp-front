import { ApiResponseStatus } from "./ApiResponseStatus";
import { ApiResponse } from "./ApiResponse";
import { ErrorBuilder } from "./ErrorBuilder";
import { IApiError } from "./IApiError";
import { RequestInitBuilder } from "./RequestInitBuilder";

export abstract class ApiBase {
    private static useMockApi() {
        return process.env.MOCK_API === "true";
    }

    // @ts-ignore
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        throw new Error (`Not implemented ${nameof(ApiBase.mockApi)}`);
    }

    private static url(url: string) {
        if (url.startsWith("http")) {
            return url;
        }
        return `${process.env.API_BASE_URL}${url}`;
    }

    protected static async get<TResponseData = any>(url: string): Promise<ApiResponse<TResponseData>> {
        if (this.useMockApi()) {
            return this.createMockResponse<TResponseData>(url, "GET");
        }

        // const builder = new RequestInitBuilder("GET");
        // const response: Response = await fetch(this.url(url), builder.build());
        const requestUrl = this.url(url);
        const requestOptions = new RequestInitBuilder("GET").build();
        const response = await fetch(requestUrl, requestOptions);

        return this.createResponse<TResponseData>(response);
    }

    protected static async post<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        if (this.useMockApi()) {
            return this.createMockResponse<TResponseData>(url, "POST", dto);
        }

        const builder = new RequestInitBuilder("POST").appendJson(dto);
        const response: Response = await fetch(this.url(url), builder.build());

        return this.createResponse<TResponseData>(response);
    }

    protected static async put<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        if (this.useMockApi()) {
            return this.createMockResponse<TResponseData>(url, "PUT", dto);
        }

        const builder = new RequestInitBuilder("PUT").appendJson(dto);
        const response: Response = await fetch(this.url(url), builder.build());

        return this.createResponse<TResponseData>(response);
    }

    protected static async patch<TResponseData = any>(url: string, dto: any): Promise<ApiResponse<TResponseData>> {
        if (this.useMockApi()) {
            return this.createMockResponse<TResponseData>(url, "PATCH", dto);
        }

        const builder = new RequestInitBuilder("PATCH").appendJson(dto);
        const response: Response = await fetch(this.url(url), builder.build());

        return this.createResponse<TResponseData>(response);
    }

    protected static async delete<TResponseData = any>(url: string, dto?: any): Promise<ApiResponse<TResponseData>> {
        if (this.useMockApi()) {
            return this.createMockResponse<TResponseData>(url, "DELETE", dto);
        }

        const builder = new RequestInitBuilder("DELETE");
        if (dto) {
            builder.appendJson(dto);
        }

        const response: Response = await fetch(this.url(url), builder.build());
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

    private static async createMockResponse<TResponseData>(url, method, data?): Promise<ApiResponse<TResponseData>> {
        const apiResponse = new ApiResponse<TResponseData>();
        apiResponse.statusCode = ApiResponseStatus.Ok;
        apiResponse.data = this.mockApi<TResponseData>(url, method, data);

        return apiResponse;
    }
}
