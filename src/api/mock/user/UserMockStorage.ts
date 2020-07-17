import { IAuthorizedUserDto } from "@api/models/user/responses";
import { Guid } from "@utils";

export class UserMockStorage {
    static authorizedUser: IAuthorizedUserDto = {
        id: Guid.generate(),
        email: "emailt@test.com",
        role: "owner",
        firstName: "Константин",
        lastName: "Парашутинский",
        patronymic: "Владимирович",
    };

    static get() {
        return UserMockStorage.authorizedUser;
    }
}
