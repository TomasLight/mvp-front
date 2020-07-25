import { ISiteSettingsUpdatedRequestDto } from "@api/models/workspace/requests";
import { ILandingConfigDto, INewLandingConfigResponseDto } from "@api/models/workspace/responses";
import { IContentSettingsResponseDto } from "@api/models/workspace/responses/IContentSettingsResponseDto";
import { ISiteSettingsResponseDto } from "@api/models/workspace/responses/ISiteSettingsResponseDto";
import { ContentConfig, LandingConfig, SiteConfig } from "@app/models";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class LandingConfigMappingProfile extends MappingProfileBase implements IMappingProfile {
    get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<ILandingConfigDto>(),
                nameof<LandingConfig>(),
                LandingConfigMappingProfile.map_ILandingConfigDto__LandingConfig
            ),
            new MapFunction(
                nameof<ISiteSettingsUpdatedRequestDto>(),
                nameof<SiteConfig>(),
                LandingConfigMappingProfile.map_ISiteSettingsUpdatedRequest__ToSiteConfig
            ),
            new MapFunction(
                nameof<IContentSettingsResponseDto>(),
                nameof<ContentConfig>(),
                LandingConfigMappingProfile.map_IWorkspaceContentSettingsResponseDto__ContentConfig
            ),
            new MapFunction(
                nameof<INewLandingConfigResponseDto>(),
                nameof<LandingConfig>(),
                LandingConfigMappingProfile.map_INewLandingConfigResponseDto__LandingConfig
            ),
        ];
    }

    private static map_ILandingConfigDto__LandingConfig(dto: ILandingConfigDto): LandingConfig {
        const config = new LandingConfig();

        config.id = dto.id;
        config.menuId = dto.menuId;
        config.workspaceId = dto.workspaceId;

        config.siteConfig =
            LandingConfigMappingProfile.map_ISiteSettingsUpdatedRequest__ToSiteConfig(dto.siteConfig);

        config.dataConfig = {};

        config.contentConfig =
            LandingConfigMappingProfile.map_IWorkspaceContentSettingsResponseDto__ContentConfig(dto.contentConfig);

        return config;
    }

    private static map_ISiteSettingsUpdatedRequest__ToSiteConfig(
        dto: ISiteSettingsResponseDto
    ): SiteConfig {
        const config = new SiteConfig();
        config.name = dto.name;
        config.faviconUrl = dto.faviconUrl;
        config.openGraphImageUrl = dto.opengraphImageUrl;
        config.openGraphTitle = dto.opengraphImageTitle;
        config.color = dto.color;
        return config;
    }

    private static map_IWorkspaceContentSettingsResponseDto__ContentConfig(
        dto: IContentSettingsResponseDto
    ): ContentConfig {
        const config = new ContentConfig();
        config.firstPhotoUrl = dto.firstPhotoUrl;
        config.firstText = dto.firstText;
        config.phone = dto.phone;
        config.address = dto.address;
        config.deliveryTime = dto.deliveryTime;
        config.deliveryMapUrl = dto.deliveryMapUrl;
        return config;
    }

    private static map_INewLandingConfigResponseDto__LandingConfig(
        dto: INewLandingConfigResponseDto
    ): LandingConfig {

        const {
            siteConfig,
            iikoConfig,
            contentConfig,
        } = dto;

        const config = new LandingConfig({
            id: dto.id,
            workspaceId: dto.workspaceId,
            menuId: dto.menuId,
            siteConfig: new SiteConfig({
                name: siteConfig.name,
                faviconUrl: siteConfig.faviconUrl,
                openGraphImageUrl: siteConfig.opengraphImageUrl,
                openGraphTitle: siteConfig.opengraphImageTitle,
                color: siteConfig.color,
            }),
            dataConfig: {},
            contentConfig: new ContentConfig({
                firstPhotoUrl: contentConfig.firstPhotoUrl,
                firstText: contentConfig.firstText,
                phone: contentConfig.phone,
                address: contentConfig.address,
                deliveryTime: contentConfig.deliveryTime,
                deliveryMapUrl: contentConfig.deliveryMapUrl,
            }),
        });

        return config;
    }
}
