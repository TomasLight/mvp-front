import { IWorkspaceContentSettingsDto, IWorkspaceSiteSettingsDto } from "@api/models/workspace/requests";
import { IContactSettingsFormValues, WorkspaceContentSettings } from "@main/Content/models";
import { ISiteSettingsFormValues } from "@main/Setup/models";
import { WorkspaceSiteSettings } from "@main/Setup/models/WorkspaceSiteSettings";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";
import set = Reflect.set;

export class WorkSpaceMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<ISiteSettingsFormValues>(),
                nameof<WorkspaceSiteSettings>(),
                WorkSpaceMappingProfile.mapWorkspaceSettingsToWorkspaceSettings
            ),
            new MapFunction(
                nameof<IContactSettingsFormValues>(),
                nameof<WorkspaceContentSettings>(),
                WorkSpaceMappingProfile.mapIContactSettingsFormValuesToWorkspaceContentSettings
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<IWorkspaceSiteSettingsDto>(),
                WorkSpaceMappingProfile.mapWorkspaceSettingsToIWorkspaceSettingsDto
            ),
            new MapFunction(
                nameof<WorkspaceContentSettings>(),
                nameof<IWorkspaceContentSettingsDto>(),
                WorkSpaceMappingProfile.mapWorkspaceContentSettingsToIWorkspaceContentSettingsDto
            ),
        ];
    }

    private static mapWorkspaceSettingsToWorkspaceSettings(
        dto: ISiteSettingsFormValues
    ): WorkspaceSiteSettings {

        const settings = MappingProfileBase.autoMap(dto, new WorkspaceSiteSettings());
        settings.openGraphImage = dto.openGraphImage.item(0);
        return settings;
    }

    private static mapIContactSettingsFormValuesToWorkspaceContentSettings(
        dto: IContactSettingsFormValues
    ): WorkspaceContentSettings {

        const settings = MappingProfileBase.autoMap(dto, new WorkspaceContentSettings());
        settings.photo = dto.photo.item(0);
        return settings;
    }

    private static mapWorkspaceSettingsToIWorkspaceSettingsDto(
        settings: WorkspaceSiteSettings
    ): IWorkspaceSiteSettingsDto {

        const dto = MappingProfileBase.autoMap<WorkspaceSiteSettings, IWorkspaceSiteSettingsDto>(
            settings, {} as any
        );

        settings.openGraphImage.arrayBuffer().then((buffer: ArrayBuffer) => {
            dto.openGraphImage = buffer;
        });

        delete dto[nameof<WorkspaceSiteSettings>(o => o.primaryColor)];
        dto.color = settings.primaryColor;

        return dto;
    }

    private static mapWorkspaceContentSettingsToIWorkspaceContentSettingsDto(
        settings: WorkspaceContentSettings
    ): IWorkspaceContentSettingsDto {

        const dto = MappingProfileBase.autoMap<WorkspaceContentSettings, IWorkspaceContentSettingsDto>(
            settings, {} as any
        );

        settings.photo.arrayBuffer().then((buffer: ArrayBuffer) => {
            dto.photo = buffer;
        });

        return dto;
    }
}
