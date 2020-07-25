import { AuthorizedUser } from "@admin/models";
import { IAuthorizedUserDto } from "@api/models/user/responses";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class UserMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IAuthorizedUserDto>(),
                nameof<AuthorizedUser>(),
                UserMappingProfile.mapIAuthorizedUserDtoToAuthorizedUser
            ),
        ];
    }

    private static mapIAuthorizedUserDtoToAuthorizedUser(dto: IAuthorizedUserDto): AuthorizedUser {
        const user = new AuthorizedUser();
        user.id = dto.id;
        user.email = dto.email;
        user.role = dto.role;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.patronymic = dto.patronymic;
        return user;
    }
}
