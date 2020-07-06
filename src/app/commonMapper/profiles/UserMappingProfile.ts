import { IAuthorizedUserDto } from "@api/models/user/responses";
import { AuthorizedUser } from "@models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class UserMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IAuthorizedUserDto>(),
                nameof<AuthorizedUser>(),
                UserMappingProfile.mapIAuthorizedUserDtoToAuthorizedUser
            ),
        ];
    }

    private static mapIAuthorizedUserDtoToAuthorizedUser(dto: IAuthorizedUserDto): AuthorizedUser {
        const user = MappingProfileBase.autoMap(dto, new AuthorizedUser());
        return user;
    }
}
