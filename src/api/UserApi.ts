import { ApiBase, ApiResponse } from "@utils/api";
import { IAuthorizedUserDto } from "./models/user/responses";

export class UserApi extends ApiBase {
    static getAuthorizedUserAsync(): Promise<ApiResponse<IAuthorizedUserDto>> {
        return this.get<IAuthorizedUserDto>(process.env.API_GET_AUTHORIZED_USER_URL);
    }
}
