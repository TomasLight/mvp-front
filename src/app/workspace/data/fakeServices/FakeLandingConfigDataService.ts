import { ContentConfig, LandingConfig, SiteConfig } from "@models";
import { brandColors } from "@shared/theme";
import { Guid } from "@utils/Guid";
import { Data } from "@utils/data/Data";
import { ILandingConfigDataService } from "../ILandingConfigDataService";
import { FakeServiceBase } from "./FakeServiceBase";

export class FakeLandingConfigDataService extends FakeServiceBase implements ILandingConfigDataService {
    constructor() {
        super();
        this.siteConfigAsync = this.siteConfigAsync.bind(this);
        this.contentConfigAsync = this.contentConfigAsync.bind(this);
        this.landingConfigAsync = this.landingConfigAsync.bind(this);

        this.landingConfig = new LandingConfig({
            id: Guid.generate(),
            workspaceId: Guid.generate(),
            menuId: Guid.generate(),
            siteConfig: new SiteConfig({
                name: "Шаурма ZBS",
                faviconUrl: "/images/favicons/avocado.svg",
                openGraphImageUrl: "/images/image_001.png",
                openGraphTitle: "Vk постик",
                color: brandColors.get(4).color,
            }),
            dataConfig: {},
            contentConfig: new ContentConfig({
                firstPhotoUrl: "/images/image_001.png",
                firstText: "Шаурма First Text",
                phone: "004",
                address: "СПБ",
                deliveryTime: "40 минут",
                deliveryMapUrl: "https://yandex.ru/map-widget/v1/?um=constructor%3A977a7ea4e4d59f3890cb2c7f5ffece9f1a8148007446514be255e11ee51dfa99",
            }),
        });
    }

    async siteConfigAsync(): Data<SiteConfig> {
        return Promise.resolve(this.landingConfig.siteConfig);
    }

    async contentConfigAsync(): Data<ContentConfig> {
        return Promise.resolve(this.landingConfig.contentConfig);
    }

    async landingConfigAsync(): Data<LandingConfig> {
        return Promise.resolve(this.landingConfig);
    }
}
