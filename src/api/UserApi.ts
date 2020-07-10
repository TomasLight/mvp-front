import { AuthorizedUser } from "@models";
import { ApiBase, ApiResponse, Mapper } from "@utils";

import { IAuthorizedUserDto } from "./models/user/responses";
import { mockApi } from "./mock/user";

export class UserApi extends ApiBase {
    protected static mockApi<TResponseData>(url, method, data?): TResponseData {
        return mockApi(url, method, data) as any;
    }

    static async getAuthorizedUser(): Promise<ApiResponse<AuthorizedUser>> {
        const response = await this.get<IAuthorizedUserDto>(process.env.CHECK_USER_AUTHORIZATION_URL);
        if (response.data) {
            response.data = Mapper.map<AuthorizedUser>(
                nameof<IAuthorizedUserDto>(),
                nameof<AuthorizedUser>(),
                response.data
            );
        }
        return response as ApiResponse<AuthorizedUser>;
    }
}
