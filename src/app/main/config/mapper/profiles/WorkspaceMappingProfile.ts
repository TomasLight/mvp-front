import { IWorkspaceSettingsDto } from "@api/models/workspace/requests";
import { ISetupFormValues } from "@main/Setup/models";
import { WorkspaceSettings } from "@main/Setup/models/WorkspaceSettings";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class WorkSpaceMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<ISetupFormValues>(),
                nameof<WorkspaceSettings>(),
                WorkSpaceMappingProfile.mapWorkspaceSettingsToWorkspaceSettings
            ),
            new MapFunction(
                nameof<WorkspaceSettings>(),
                nameof<IWorkspaceSettingsDto>(),
                WorkSpaceMappingProfile.mapWorkspaceSettingsToIWorkspaceSettingsDto
            ),
        ];
    }

    private static mapWorkspaceSettingsToWorkspaceSettings(dto: ISetupFormValues): WorkspaceSettings {
        const settings = MappingProfileBase.autoMap(dto, new WorkspaceSettings());
        return settings;
    }

    private static mapWorkspaceSettingsToIWorkspaceSettingsDto(settings: WorkspaceSettings): IWorkspaceSettingsDto {
        const dto = MappingProfileBase.autoMap<WorkspaceSettings, IWorkspaceSettingsDto>(settings, {} as any);
        delete dto[nameof<WorkspaceSettings>(o => o.primaryColor)];
        dto.color = settings.primaryColor;
        return dto;
    }
}
