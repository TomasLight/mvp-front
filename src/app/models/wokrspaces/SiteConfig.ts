interface ISiteConfig {
    name: string;
    faviconUrl: string;
    openGraphImageUrl: string;
    openGraphTitle: string;
    color: string;
}

export class SiteConfig implements ISiteConfig {
    name: string;
    faviconUrl: string;
    openGraphImageUrl: string;
    openGraphTitle: string;
    color: string;

    constructor() {
        this.name = "";
        this.faviconUrl = "";
        this.openGraphImageUrl = "";
        this.openGraphTitle = "";
        this.color = "";
    }
}
