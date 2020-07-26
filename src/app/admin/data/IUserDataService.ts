import { AuthorizedUser } from "@admin/models";
import { Data } from "@utils/data/Data";

export interface IUserDataService {
    authorizedUserAsync(): Data<AuthorizedUser>;
}
