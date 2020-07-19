import { UserApi } from "@api";
import { IAuthorizedUserDto } from "@api/models/user/responses";
import { DataFailed } from "@data";
import { AuthorizedUser } from "@models";
import { ApiResponseStatus, Mapper } from "@utils";
import { ActionProcessing } from "../ActionProcessing";
import { DataServiceBase } from "../DataServiceBase";

type Data<TModel> = Promise<DataFailed | TModel>;

export class UserDataService extends DataServiceBase {
    private _authorizedUser: AuthorizedUser;

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
