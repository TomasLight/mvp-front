import { ContentConfig } from "./ContentConfig";
import { DataConfig } from "./DataConfig";
import { SiteConfig } from "./SiteConfig";

interface ILandingConfig {
    id: string;
    workspaceId: string;
    menuId: string;
    siteConfig: SiteConfig;
    dataConfig: DataConfig;
    contentConfig: ContentConfig;
}

export class LandingConfig implements ILandingConfig {
    id: string;
    workspaceId: string;
    menuId: string;
    siteConfig: SiteConfig;
    dataConfig: DataConfig;
    contentConfig: ContentConfig;

    constructor() {
        this.id = "";
        this.workspaceId = "";
        this.menuId = "";
        this.siteConfig = new SiteConfig();
        this.dataConfig = new DataConfig();
        this.contentConfig = new ContentConfig();
    }
}
