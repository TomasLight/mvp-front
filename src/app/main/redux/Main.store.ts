import { LandingConfig } from "@app/models";

export class MainStore {
    workspacesAreLoading: boolean;
    settingsMode: "create" | "update";

    hasWorkspace: boolean;
    landingConfig: LandingConfig;
    landingConfigIsLoading: boolean;

    constructor() {
        this.workspacesAreLoading = false;
        this.settingsMode = "update";

        this.hasWorkspace = false;
        this.landingConfig = new LandingConfig();
        this.landingConfigIsLoading = false;
    }
}
