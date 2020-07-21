import { ContentConfig } from "./ContentConfig";
import { SiteConfig } from "./SiteConfig";

interface ILandingConfig {
    id: string;
    workspaceId: string;
    menuId: string;
    siteConfig: SiteConfig;
    dataConfig: {};
    contentConfig: ContentConfig;
}

export class LandingConfig implements ILandingConfig {
    id: string;
    workspaceId: string;
    menuId: string;
    siteConfig: SiteConfig;
    dataConfig: {};
    contentConfig: ContentConfig;

    constructor(config: ILandingConfig = null) {
        if (!config) {
            this.id = "";
            this.workspaceId = "";
            this.menuId = "";
            this.siteConfig = new SiteConfig();
            this.dataConfig = {};
            this.contentConfig = new ContentConfig();
        }
        else {
            this.id = config.id;
            this.workspaceId = config.workspaceId;
            this.menuId = config.menuId;
            this.siteConfig = config.siteConfig;
            this.dataConfig = config.dataConfig;
            this.contentConfig = config.contentConfig;
        }
    }
}
