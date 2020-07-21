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

    constructor() {
        this.id = "";
        this.workspaceId = "";
        this.menuId = "";
        this.siteConfig = new SiteConfig();
        this.dataConfig = {};
        this.contentConfig = new ContentConfig();
    }
}
