import { ContentConfig, SiteConfig } from "@models";

export class WorkspaceStore {
    dataIsLoading: boolean;
    site: SiteConfig;
    content: ContentConfig;
    menuId: string;

    constructor() {
        this.dataIsLoading = false;
        this.site = new SiteConfig();
        this.content = new ContentConfig();
        this.menuId = "";
    }
}
