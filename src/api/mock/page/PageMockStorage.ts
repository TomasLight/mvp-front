import { LandingConfigMockStorage } from "@api/mock/workspace/LandingConfigMockStorage";
import { IPagesDto } from "@api/models/page/responses";

export class PageMockStorage {
    static pages: IPagesDto = {
        index: {
            layout: "demo",
            alias: "",
            blocks: [
                {
                    type: "site",
                    props: {
                        title: LandingConfigMockStorage.get().siteConfig.name,
                        keywords: "в конфиге не хватает keywords",
                        description: "в конфиге не хватает demo description",
                        favicon: "/images/skull-favicon.ico",
                        opengraphImageTitle: LandingConfigMockStorage.get().siteConfig.opengraphImageTitle,
                        opengraphImageUrl: LandingConfigMockStorage.get().siteConfig.opengraphImageUrl,
                        styleColor: LandingConfigMockStorage.get().siteConfig.color,
                    },
                },
                {
                    type: "menu",
                    props: {
                        menuId: LandingConfigMockStorage.get().menuId,
                    },
                },
                {
                    type: "content",
                    props: {
                        firstPhotoUrl: LandingConfigMockStorage.get().contentConfig.firstPhotoUrl,
                        firstText: LandingConfigMockStorage.get().contentConfig.firstText,
                        phone: LandingConfigMockStorage.get().contentConfig.phone,
                        address: LandingConfigMockStorage.get().contentConfig.address,
                        deliveryTime: LandingConfigMockStorage.get().contentConfig.deliveryTime,
                        deliveryMapUrl: LandingConfigMockStorage.get().contentConfig.deliveryMapUrl,
                    },
                },
            ],
        },
    };

    static list() {
        return PageMockStorage.pages;
    }
}
