export class MainStore {
    workspacesAreLoading: boolean;
    settingsMode: "create" | "update";
    workspaceId: string;
    landingConfigId: string;

    constructor() {
        this.workspacesAreLoading = false;
        this.settingsMode = "update";
        this.workspaceId = "";
        this.landingConfigId = "";
    }
}
