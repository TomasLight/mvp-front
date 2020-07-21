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

    constructor(config: ISiteConfig = null) {
        if (!config) {
            this.name = "";
            this.faviconUrl = "";
            this.openGraphImageUrl = "";
            this.openGraphTitle = "";
            this.color = "";
        }
        else {
            this.name = config.name;
            this.faviconUrl = config.faviconUrl;
            this.openGraphImageUrl = config.openGraphImageUrl;
            this.openGraphTitle = config.openGraphTitle;
            this.color = config.color;
        }
    }
}
