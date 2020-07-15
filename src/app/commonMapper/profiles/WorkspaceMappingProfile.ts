import { IUserWorkspaceDto } from "@api/models/workspace/responses";
import { UserWorkspace } from "@app/models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class WorkspaceMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IUserWorkspaceDto>(),
                nameof<UserWorkspace>(),
                WorkspaceMappingProfile.mapIUserWorkspaceDtoToUserWorkspace
            ),
        ];
    }

    private static mapIUserWorkspaceDtoToUserWorkspace(dto: IUserWorkspaceDto): UserWorkspace {
        const user = MappingProfileBase.autoMap(dto, new UserWorkspace());
        return user;
    }
}
