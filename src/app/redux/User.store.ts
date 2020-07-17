import { AuthorizedUser } from "@models/user";

export class UserStore {
    authorizedUser: AuthorizedUser;

    constructor() {
        this.authorizedUser = new AuthorizedUser();
    }
}
