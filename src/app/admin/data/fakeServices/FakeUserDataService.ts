import { AuthorizedUser } from "@admin/models";
import { Guid } from "@utils";
import { Data } from "@utils/data/Data";
import { IUserDataService } from "../IUserDataService";
import { FakeServiceBase } from "./FakeServiceBase";

export class FakeUserDataService extends FakeServiceBase implements IUserDataService {
    constructor() {
        super();
        this.authorizedUser = new AuthorizedUser({
            id: Guid.generate(),
            email: "emailt@test.com",
            role: "owner",
            firstName: "Константин",
            lastName: "Парашутинский",
            patronymic: "Владимирович",
        });
        this.authorizedUserAsync = this.authorizedUserAsync.bind(this);
    }

    async authorizedUserAsync(): Data<AuthorizedUser> {
        return Promise.resolve(this.authorizedUser);
    }
}
