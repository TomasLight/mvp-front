interface IWorkspaceSiteSettings {
    siteName: string;
    domain: string;
    favicon: number;

    openGraphImage: File;
    openGraphTitle: string;

    primaryColor: string;
}

export class WorkspaceSiteSettings implements IWorkspaceSiteSettings {
    siteName: string;
    domain: string;
    favicon: number;

    openGraphImage: File;
    openGraphTitle: string;

    primaryColor: string;

    constructor(settings: IWorkspaceSiteSettings = null) {
        if (!settings) {
            this.siteName = "";
            this.domain = "";
            this.favicon = null;
            this.openGraphImage = null;
            this.openGraphTitle = "";
            this.primaryColor = "";
        }
        else {
            this.siteName = settings.siteName;
            this.domain = settings.domain;
            this.favicon = settings.favicon;
            this.openGraphImage = settings.openGraphImage;
            this.openGraphTitle = settings.openGraphTitle;
            this.primaryColor = settings.primaryColor;
        }
    }
}
