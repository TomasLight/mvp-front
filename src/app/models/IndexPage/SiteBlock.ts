export interface ISiteBlock {
    title: string;
    keywords: string;
    description: string;
    favicon: string;
    openGraphImageTitle: string;
    openGraphImageUrl: string;
    styleColor: string;
}

export class SiteBlock {
    public title: string;
    public keywords: string;
    public description: string;
    public favicon: string;
    public openGraphImageTitle: string;
    public openGraphImageUrl: string;
    public styleColor: string;

    constructor(block: ISiteBlock = null) {
        if (!block) {
            this.title = "";
            this.keywords = "";
            this.description = "";
            this.favicon = "";
            this.openGraphImageTitle = "";
            this.openGraphImageUrl = "";
            this.styleColor = "";
        }
        else {
            this.title = block.title;
            this.keywords = block.keywords;
            this.description = block.description;
            this.favicon = block.favicon;
            this.openGraphImageTitle = block.openGraphImageTitle;
            this.openGraphImageUrl = block.openGraphImageUrl;
            this.styleColor = block.styleColor;
        }
    }
}
