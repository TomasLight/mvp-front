interface IWorkspaceSettings {
    siteName: string;
    domain: string;
    favicon: number;

    openGraphImage: string;
    openGraphTitle: string;

    primaryColor: string;
}

export class WorkspaceSettings implements IWorkspaceSettings {
    siteName: string;
    domain: string;
    favicon: number;

    openGraphImage: string;
    openGraphTitle: string;

    primaryColor: string;

    constructor(settings: IWorkspaceSettings = null) {
        if (!settings) {
            this.siteName = "";
            this.domain = "";
            this.favicon = null;
            this.openGraphImage = "";
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
