export class MainStore {
    workspacesAreLoading: boolean;
    settingsMode: "create" | "update";

    constructor() {
        this.workspacesAreLoading = false;
        this.settingsMode = "update";
    }
}
