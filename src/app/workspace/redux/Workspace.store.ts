import { ContentConfig, SiteConfig } from "@models";

export class WorkspaceStore {
    appIsInitialized: boolean;
    dataIsLoading: boolean;
    site: SiteConfig;
    content: ContentConfig;
    menuId: string;

    constructor() {
        this.appIsInitialized = false;
        this.dataIsLoading = false;
        this.site = new SiteConfig();
        this.content = new ContentConfig();
        this.menuId = "";
    }
}
