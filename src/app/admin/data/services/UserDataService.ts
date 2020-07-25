import { AuthorizedUser } from "@admin/models";
import { UserApi } from "@api";
import { IAuthorizedUserDto } from "@api/models/user/responses";
import { DataFailed } from "@utils/data/DataFailed";
import { ApiResponseStatus, Mapper } from "@utils";
import { ActionProcessing } from "@utils/data/ActionProcessing";
import { Data } from "@utils/data/Data";
import { DataServiceBase } from "./DataServiceBase";
import { IUserDataService } from "../IUserDataService";

export class UserDataService extends DataServiceBase implements IUserDataService {
    constructor() {
        super();
        this.authorizedUserAsync = this.authorizedUserAsync.bind(this);
    }

    async authorizedUserAsync(): Data<AuthorizedUser> {
        if (this._authorizedUser) {
            return this._authorizedUser;
        }

        const response = await UserApi.getAuthorizedUserAsync();
        if (response.hasError()) {
            if (response.statusCode === ApiResponseStatus.Unauthorized) {
                return new DataFailed({
                    actionProcessing: new ActionProcessing("redirect"),
                });
            }

            return this.failed(response);
        }

        this._authorizedUser = Mapper.map<AuthorizedUser>(
            nameof<IAuthorizedUserDto>(),
            nameof<AuthorizedUser>(),
            response.data
        );

        return this._authorizedUser;
    }
}
