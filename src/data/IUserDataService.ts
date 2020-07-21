import { AuthorizedUser } from "@models";
import { Data } from "./Data";

export interface IUserDataService {
    authorizedUserAsync(): Data<AuthorizedUser>;
}
