import { ApiBase, ApiResponse } from "@utils/api";
import { IAuthorizedUserDto } from "./models/user/responses";
import { mockApi } from "./mock/user";

export class UserApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static getAuthorizedUserAsync(): Promise<ApiResponse<IAuthorizedUserDto>> {
        return this.get<IAuthorizedUserDto>(process.env.API_GET_AUTHORIZED_USER_URL);
    }
}
