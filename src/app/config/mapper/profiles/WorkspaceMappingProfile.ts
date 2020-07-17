import {
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import { IUserWorkspaceDto, ILandingConfig } from "@api/models/workspace/responses";
import { ContentConfig, DataConfig, LandingConfig, SiteConfig, UserWorkspace } from "@app/models";
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
            new MapFunction(
                nameof<ILandingConfig>(),
                nameof<LandingConfig>(),
                WorkspaceMappingProfile.mapILandingConfigToLandingConfig
            ),
            new MapFunction(
                nameof<IWorkspaceSiteSettingsDto>(),
                nameof<SiteConfig>(),
                WorkspaceMappingProfile.mapIWorkspaceSiteSettingsDtoToSiteConfig
            ),
            new MapFunction(
                nameof<IWorkspaceDataSettingsDto>(),
                nameof<DataConfig>(),
                WorkspaceMappingProfile.mapIWorkspaceDataSettingsDtoToDataConfig
            ),
            new MapFunction(
                nameof<IWorkspaceContentSettingsDto>(),
                nameof<ContentConfig>(),
                WorkspaceMappingProfile.mapIWorkspaceContentSettingsDtoToContentConfig
            ),
        ];
    }

    private static mapIUserWorkspaceDtoToUserWorkspace(dto: IUserWorkspaceDto): UserWorkspace {
        const user = MappingProfileBase.autoMap(dto, new UserWorkspace());
        return user;
    }

    private static mapILandingConfigToLandingConfig(dto: ILandingConfig): LandingConfig {
        const config = new LandingConfig();

        config.id = dto.id;
        config.menuId = dto.menuId;
        config.workspaceId = dto.workspaceId;

        config.siteConfig =
            WorkspaceMappingProfile.mapIWorkspaceSiteSettingsDtoToSiteConfig(dto.siteConfig);

        config.dataConfig =
            WorkspaceMappingProfile.mapIWorkspaceDataSettingsDtoToDataConfig(dto.iikoConfig);

        config.contentConfig =
            WorkspaceMappingProfile.mapIWorkspaceContentSettingsDtoToContentConfig(dto.contentConfig);

        return config;
    }

    private static mapIWorkspaceSiteSettingsDtoToSiteConfig(dto: IWorkspaceSiteSettingsDto): SiteConfig {
        const config = MappingProfileBase.autoMap(dto, new SiteConfig());

        delete config[nameof<IWorkspaceSiteSettingsDto>(o => o.opengraphImageUrl)];
        delete config[nameof<IWorkspaceSiteSettingsDto>(o => o.opengraphImageTitle)];

        config.openGraphImageUrl = dto.opengraphImageUrl;
        config.openGraphTitle = dto.opengraphImageTitle;
        return config;
    }

    private static mapIWorkspaceDataSettingsDtoToDataConfig(dto: IWorkspaceDataSettingsDto): DataConfig {
        const config = MappingProfileBase.autoMap(dto, new DataConfig());
        return config;
    }

    private static mapIWorkspaceContentSettingsDtoToContentConfig(dto: IWorkspaceContentSettingsDto): ContentConfig {
        const config = MappingProfileBase.autoMap(dto, new ContentConfig());
        return config;
    }
}
