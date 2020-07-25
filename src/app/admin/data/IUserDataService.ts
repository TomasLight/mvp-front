import { AuthorizedUser } from "@models";
import { Data } from "@utils/data/Data";

export interface IUserDataService {
    authorizedUserAsync(): Data<AuthorizedUser>;
}
