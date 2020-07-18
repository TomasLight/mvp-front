import { PageMockStorage } from "@api/mock/page/PageMockStorage";
import { WorkspaceMockStorage } from "@api/mock/workspace/WorkspaceMockStorage";
import {
    IWorkspaceContentSettingsDto,
    IWorkspaceDataSettingsDto,
    IWorkspaceSiteSettingsDto
} from "@api/models/workspace/requests";
import { ILandingConfig } from "@api/models/workspace/responses";
import { brandColors } from "@shared/theme";
import { Guid } from "@utils";

export class LandingConfigMockStorage {
    static landingConfig: ILandingConfig = {
        "id": Guid.generate(),
        "workspaceId": WorkspaceMockStorage.workspaces[0].id,
        "menuId": Guid.generate(),
        "siteConfig": {
            "name": "Шаурма ZBS",
            "faviconUrl": "/images/favicons/avocado.svg",
            "opengraphImageUrl": "/images/image_001.png",
            "opengraphImageTitle": "Vk постик",
            "color": brandColors.get(4).color,
        },
        "iikoConfig": {
            "archive": null,
        },
        "contentConfig": {
            "firstPhotoUrl": "/images/image_001.png",
            "firstText": "Шаурма First Text",
            "phone": "004",
            "address": "СПБ",
            "deliveryTime": "40 минут",
            "deliveryMapUrl": "https://yandex.ru",
        },
    };

    static get() {
        return LandingConfigMockStorage.landingConfig;
    }

    static updateSite(site: IWorkspaceSiteSettingsDto) {
        const siteBlock = PageMockStorage.pages.index.blocks.find(block => block.type === "site");

        if (site.name) {
            LandingConfigMockStorage.landingConfig.siteConfig.name = site.name;
            siteBlock.props["title"] = site.name;
        }
        if (site.faviconUrl) {
            LandingConfigMockStorage.landingConfig.siteConfig.faviconUrl = site.faviconUrl;
            siteBlock.props["favicon"] = site.name;
        }
        if (site.opengraphImageUrl) {
            LandingConfigMockStorage.landingConfig.siteConfig.opengraphImageUrl = site.opengraphImageUrl;
            siteBlock.props["opengraphImageUrl"] = site.name;
        }
        if (site.opengraphImageTitle) {
            LandingConfigMockStorage.landingConfig.siteConfig.opengraphImageTitle = site.opengraphImageTitle;
            siteBlock.props["opengraphImageTitle"] = site.name;
        }
        if (site.color) {
            LandingConfigMockStorage.landingConfig.siteConfig.color = site.color;
            siteBlock.props["styleColor"] = site.name;
        }
    }

    static updateData(data: IWorkspaceDataSettingsDto) {
        if (data.archive) {
            LandingConfigMockStorage.landingConfig.iikoConfig.archive = data.archive;
        }
    }

    static updateContent(content: IWorkspaceContentSettingsDto) {
        const contentBlock = PageMockStorage.pages.index.blocks.find(block => block.type === "content");

        if (content.firstPhotoUrl) {
            LandingConfigMockStorage.landingConfig.contentConfig.firstPhotoUrl = content.firstPhotoUrl;
            contentBlock.props["firstPhotoUrl"] = content.firstPhotoUrl;
        }
        if (content.firstText) {
            LandingConfigMockStorage.landingConfig.contentConfig.firstText = content.firstText;
            contentBlock.props["firstText"] = content.firstText;
        }
        if (content.phone) {
            LandingConfigMockStorage.landingConfig.contentConfig.phone = content.phone;
            contentBlock.props["phone"] = content.phone;
        }
        if (content.address) {
            LandingConfigMockStorage.landingConfig.contentConfig.address = content.address;
            contentBlock.props["address"] = content.address;
        }
        if (content.deliveryTime) {
            LandingConfigMockStorage.landingConfig.contentConfig.deliveryTime = content.deliveryTime;
            contentBlock.props["deliveryTime"] = content.deliveryTime;
        }
        if (content.deliveryMapUrl) {
            LandingConfigMockStorage.landingConfig.contentConfig.deliveryMapUrl = content.deliveryMapUrl;
            contentBlock.props["deliveryMapUrl"] = content.deliveryMapUrl;
        }
    }
}
