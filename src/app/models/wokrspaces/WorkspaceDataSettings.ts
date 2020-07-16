interface IWorkspaceDataSettings {
    archive: File;
}

export class WorkspaceDataSettings implements IWorkspaceDataSettings {
    archive: File;

    constructor(settings: IWorkspaceDataSettings = null) {
        if (!settings) {
            this.archive = null;
        }
        else {
            this.archive = settings.archive;
        }
    }
}
