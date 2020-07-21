import { WorkspaceMockStorage } from "@api/mock/workspace/WorkspaceMockStorage";
import {
    IContentSettingsRequestDto,
    IDataSettingsUpdatedRequestDto,
    ISiteSettingsUpdatedRequestDto
} from "@api/models/workspace/requests";
import { ILandingConfigDto } from "@api/models/workspace/responses";
import { brandColors } from "@shared/theme";
import { Guid } from "@utils";

export class LandingConfigMockStorage {
    static landingConfig: ILandingConfigDto = {
        id: Guid.generate(),
        workspaceId: WorkspaceMockStorage.workspaces[0].id,
        menuId: Guid.generate(),
        siteConfig: {
            name: "Шаурма ZBS",
            faviconUrl: "/images/favicons/avocado.svg",
            opengraphImageUrl: "/images/image_001.png",
            opengraphImageTitle: "Vk постик",
            color: brandColors.get(4).color,
        },
        iikoConfig: {
            archive: null,
        },
        contentConfig: {
            firstPhotoUrl: "/images/image_001.png",
            firstText: "Шаурма First Text",
            phone: "004",
            address: "СПБ",
            deliveryTime: "40 минут",
            deliveryMapUrl: "https://yandex.ru",
        },
    };

    static get() {
        return LandingConfigMockStorage.landingConfig;
    }

    static updateSite(site: ISiteSettingsUpdatedRequestDto) {
        const { siteConfig } = LandingConfigMockStorage.landingConfig;

        if (site.name) {
            siteConfig.name = site.name;
        }
        if (site.faviconUrl) {
            siteConfig.faviconUrl = site.faviconUrl;
        }
        if (site.opengraphImage) {
            siteConfig.opengraphImageUrl = site.opengraphImage;
        }
        if (site.opengraphImageTitle) {
            siteConfig.opengraphImageTitle = site.opengraphImageTitle;
        }
        if (site.color) {
            siteConfig.color = site.color;
        }
    }

    static updateData(data: IDataSettingsUpdatedRequestDto) {
        if (data.archive) {
            // LandingConfigMockStorage.landingConfig.iikoConfig.archive = data.archive;
        }
    }

    static updateContent(content: IContentSettingsRequestDto) {
        const { contentConfig } = LandingConfigMockStorage.landingConfig;

        if (content.firstPhoto) {
            // contentConfig.firstPhotoUrl = content.firstPhoto;
        }
        if (content.firstText) {
            contentConfig.firstText = content.firstText;
        }
        if (content.phone) {
            contentConfig.phone = content.phone;
        }
        if (content.address) {
            contentConfig.address = content.address;
        }
        if (content.deliveryTime) {
            contentConfig.deliveryTime = content.deliveryTime;
        }
        if (content.deliveryMapUrl) {
            contentConfig.deliveryMapUrl = content.deliveryMapUrl;
        }
    }
}
