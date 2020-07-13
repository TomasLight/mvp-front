import { IWorkspaceContentSettingsDto, IWorkspaceSettingsDto } from "@api/models/workspace/requests";
import { WorkspaceContentSettings } from "@app/models";
import { IContactSettingsFormValues } from "@main/Content/models";
import { ISiteSettingsFormValues } from "@main/Setup/models";
import { WorkspaceSiteSettings } from "@app/models/wokrspaces/WorkspaceSiteSettings";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

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
                nameof<IWorkspaceSettingsDto>(),
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
    ): IWorkspaceSettingsDto {

        const dto: IWorkspaceSettingsDto = {
            domain: settings.domain,
            siteConfig: {
                name: settings.siteName,
                faviconUrl: settings.favicon,
                opengraphImageTitle: settings.openGraphTitle,
                opengraphImageUrl: null,
                color: settings.primaryColor,
            },
        };

        settings.openGraphImage.arrayBuffer().then((buffer: ArrayBuffer) => {
            dto.siteConfig.opengraphImageUrl = buffer;
        });

        return dto;
    }

    private static mapWorkspaceContentSettingsToIWorkspaceContentSettingsDto(
        settings: WorkspaceContentSettings
    ): IWorkspaceContentSettingsDto {

        const dto: IWorkspaceContentSettingsDto = {
            firstPhotoUrl: null,
            firstText: settings.firstBlockText,
            phone: settings.phone,
            address: settings.address,
            deliveryTime: settings.deliveryTime,
            deliveryMapUrl: settings.deliveryLocationLink,
        };

        settings.photo.arrayBuffer().then((buffer: ArrayBuffer) => {
            dto.firstPhotoUrl = buffer;
        });

        return dto;
    }
}
