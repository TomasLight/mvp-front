import {
    INewWorkspaceDto,
    IWorkspaceContentSettingsDto,
    IWorkspaceSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import { WorkspaceContentSettings, WorkspaceDataSettings } from "@app/models";
import { IContactSettingsFormValues } from "@main/Content/models";
import { IDataSettingsFormValues } from "@main/Data/models";
import { ISiteSettingsFormValues } from "@main/Site/models";
import { WorkspaceSiteSettings } from "@app/models/wokrspaces/WorkspaceSiteSettings";
import { FavIconUrlResolver } from "@shared/molecules";
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
                nameof<IDataSettingsFormValues>(),
                nameof<WorkspaceDataSettings>(),
                WorkSpaceMappingProfile.mapIDataSettingsFormValuesToWorkspaceDataSettings
            ),
            new MapFunction(
                nameof<IContactSettingsFormValues>(),
                nameof<WorkspaceContentSettings>(),
                WorkSpaceMappingProfile.mapIContactSettingsFormValuesToWorkspaceContentSettings
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<IWorkspaceSiteSettingsDto>(),
                WorkSpaceMappingProfile.mapWorkspaceSettingsToIWorkspaceSiteSettingsDto
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
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<INewWorkspaceDto>(),
                WorkSpaceMappingProfile.mapWorkspaceSiteSettingsToINewWorkspaceDto
            ),
        ];
    }

    private static mapWorkspaceSettingsToWorkspaceSettings(
        dto: ISiteSettingsFormValues
    ): WorkspaceSiteSettings {

        const settings = MappingProfileBase.autoMap(dto, new WorkspaceSiteSettings());
        if (dto.openGraphImage) {
            settings.openGraphImage = dto.openGraphImage.item(0);
        }
        return settings;
    }

    private static mapIDataSettingsFormValuesToWorkspaceDataSettings(
        dto: IDataSettingsFormValues
    ): WorkspaceDataSettings {

        const settings = MappingProfileBase.autoMap(dto, new WorkspaceDataSettings());
        if (dto.archive) {
            settings.archive = dto.archive.item(0);
        }
        return settings;
    }

    private static mapIContactSettingsFormValuesToWorkspaceContentSettings(
        dto: IContactSettingsFormValues
    ): WorkspaceContentSettings {

        const settings = MappingProfileBase.autoMap(dto, new WorkspaceContentSettings());
        if (dto.photo) {
            settings.photo = dto.photo.item(0);
        }
        return settings;
    }

    private static mapWorkspaceSettingsToIWorkspaceSiteSettingsDto(
        settings: WorkspaceSiteSettings
    ): IWorkspaceSiteSettingsDto {

        const dto: IWorkspaceSiteSettingsDto = {
            name: settings.siteName,
            faviconUrl: FavIconUrlResolver.getUrl(settings.favicon),
            opengraphImageTitle: settings.openGraphTitle,
            opengraphImageUrl: null,
            color: settings.primaryColor,
        };

        return dto;
    }

    private static mapWorkspaceSettingsToIWorkspaceSettingsDto(
        settings: WorkspaceSiteSettings
    ): IWorkspaceSettingsDto {

        const siteConfig = WorkSpaceMappingProfile.mapWorkspaceSettingsToIWorkspaceSiteSettingsDto(settings);
        const dto: IWorkspaceSettingsDto = {
            domain: settings.domain,
            siteConfig,
        };

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

        return dto;
    }

    private static mapWorkspaceSiteSettingsToINewWorkspaceDto(
        settings: WorkspaceSiteSettings
    ): INewWorkspaceDto {

        const dto: INewWorkspaceDto = {
            domain: settings.domain,
            name: settings.siteName,
        };

        return dto;
    }
}
