import { IContactSettingsFormValues } from "@admin/Content/models";
import { IImportSettingsFormValues } from "@admin/Import/models";
import { ISiteSettingsFormValues } from "@admin/Site/models";
import {
    IContentSettingsRequestDto,
    INewLandingConfigRequestDto,
    INewWorkspaceRequestDto,
    ISiteSettingsUpdatedRequestDto,
    IWorkspaceSettingsRequestDto
} from "@api/models/workspace/requests";
import { IUserWorkspaceResponseDto } from "@api/models/workspace/responses";
import { Workspace, WorkspaceContentSettings, WorkspaceDataSettings } from "@app/models";
import { WorkspaceSiteSettings } from "@app/models/wokrspaces/WorkspaceSiteSettings";
import { FavIconUrlResolver } from "@shared/molecules";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class WorkspaceMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IUserWorkspaceResponseDto>(),
                nameof<Workspace>(),
                WorkspaceMappingProfile.map_IUserWorkspaceResponseDto__UserWorkspace
            ),
            new MapFunction(
                nameof<ISiteSettingsFormValues>(),
                nameof<WorkspaceSiteSettings>(),
                WorkspaceMappingProfile.map_ISiteSettingsFormValues__WorkspaceSiteSettings
            ),
            new MapFunction(
                nameof<IImportSettingsFormValues>(),
                nameof<WorkspaceDataSettings>(),
                WorkspaceMappingProfile.map_IDataSettingsFormValues__WorkspaceDataSettings
            ),
            new MapFunction(
                nameof<IContactSettingsFormValues>(),
                nameof<WorkspaceContentSettings>(),
                WorkspaceMappingProfile.map_IContactSettingsFormValues__WorkspaceContentSettings
            ),
            new MapFunction(
                nameof<WorkspaceContentSettings>(),
                nameof<IContentSettingsRequestDto>(),
                WorkspaceMappingProfile.map_WorkspaceContentSettings__IContentSettingsRequestDto
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<ISiteSettingsUpdatedRequestDto>(),
                WorkspaceMappingProfile.map_WorkspaceSiteSettings__ISiteSettingsUpdatedRequestDto
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<IWorkspaceSettingsRequestDto>(),
                WorkspaceMappingProfile.map_WorkspaceSiteSettings__IWorkspaceSettingsRequestDto
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<INewWorkspaceRequestDto>(),
                WorkspaceMappingProfile.map_WorkspaceSiteSettings__INewWorkspaceRequestDto
            ),
            new MapFunction(
                nameof<WorkspaceSiteSettings>(),
                nameof<INewLandingConfigRequestDto>(),
                WorkspaceMappingProfile.map_WorkspaceSiteSettings__INewLandingConfigRequestDto
            ),
        ];
    }

    private static map_IUserWorkspaceResponseDto__UserWorkspace(dto: IUserWorkspaceResponseDto): Workspace {
        const user = new Workspace();
        user.role = dto.role;
        user.id = dto.id;
        user.domain = dto.domainName;
        user.name = dto.name;
        return user;
    }

    private static map_ISiteSettingsFormValues__WorkspaceSiteSettings(
        dto: ISiteSettingsFormValues
    ): WorkspaceSiteSettings {

        const settings = new WorkspaceSiteSettings();
        settings.siteName = dto.siteName;
        settings.domain = dto.domain;
        settings.favicon = dto.favicon;
        if (dto.openGraphImage) {
            settings.openGraphImage = dto.openGraphImage.item(0);
        }
        settings.openGraphTitle = dto.openGraphTitle;
        settings.primaryColor = dto.primaryColor;
        return settings;
    }

    private static map_IDataSettingsFormValues__WorkspaceDataSettings(
        dto: IImportSettingsFormValues
    ): WorkspaceDataSettings {

        const settings = new WorkspaceDataSettings();
        if (dto.archive) {
            settings.archive = dto.archive.item(0);
        }
        return settings;
    }

    private static map_IContactSettingsFormValues__WorkspaceContentSettings(
        dto: IContactSettingsFormValues
    ): WorkspaceContentSettings {

        const settings = new WorkspaceContentSettings();
        settings.firstBlockText = dto.firstBlockText;
        if (dto.photo) {
            settings.photo = dto.photo.item(0);
        }
        settings.phone = dto.phone;
        settings.address = dto.address;
        settings.deliveryTime = dto.deliveryTime;
        settings.deliveryLocationLink = dto.deliveryLocationLink;
        return settings;
    }

    private static map_WorkspaceContentSettings__IContentSettingsRequestDto(
        settings: WorkspaceContentSettings
    ): IContentSettingsRequestDto {

        const dto: IContentSettingsRequestDto = {
            firstText: settings.firstBlockText,
            phone: settings.phone,
            address: settings.address,
            deliveryTime: settings.deliveryTime,
            deliveryMapUrl: settings.deliveryLocationLink,
        };

        return dto;
    }

    private static map_WorkspaceSiteSettings__ISiteSettingsUpdatedRequestDto(
        settings: WorkspaceSiteSettings
    ): ISiteSettingsUpdatedRequestDto {

        const dto: ISiteSettingsUpdatedRequestDto = {
            name: settings.siteName,
            faviconUrl: FavIconUrlResolver.getUrl(settings.favicon),
            opengraphImageTitle: settings.openGraphTitle,
            color: settings.primaryColor,
        };

        return dto;
    }

    private static map_WorkspaceSiteSettings__IWorkspaceSettingsRequestDto(
        settings: WorkspaceSiteSettings
    ): IWorkspaceSettingsRequestDto {

        const siteConfig = WorkspaceMappingProfile.map_WorkspaceSiteSettings__ISiteSettingsUpdatedRequestDto(settings);
        const dto: IWorkspaceSettingsRequestDto = {
            domain: settings.domain,
            siteConfig,
        };

        return dto;
    }

    private static map_WorkspaceSiteSettings__INewWorkspaceRequestDto(
        settings: WorkspaceSiteSettings
    ): INewWorkspaceRequestDto {

        const dto: INewWorkspaceRequestDto = {
            domainName: settings.domain,
            name: settings.siteName,
        };

        return dto;
    }

    private static map_WorkspaceSiteSettings__INewLandingConfigRequestDto(
        settings: WorkspaceSiteSettings
    ): INewLandingConfigRequestDto {

        const dto: INewLandingConfigRequestDto = {
            domainName: settings.domain,
            siteConfig: {
                name: settings.siteName,
                faviconUrl: FavIconUrlResolver.getUrl(settings.favicon),
                opengraphImageTitle: settings.openGraphTitle,
                color: settings.primaryColor,
            },
            iikoConfig: {},
            contentConfig: {
                firstPhoto: "",
                firstText: "",
                phone: "",
                address: "",
                deliveryTime: "",
                deliveryMapUrl: "",
            },
        };

        return dto;
    }
}
