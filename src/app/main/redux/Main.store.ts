import { LandingConfig } from "@app/models";

export class MainStore {
    workspacesAreLoading: boolean;
    settingsMode: "create" | "update";

    landingConfig: LandingConfig;
    landingConfigIsLoading: boolean;

    constructor() {
        this.workspacesAreLoading = false;
        this.settingsMode = "update";
        this.landingConfig = new LandingConfig();
        this.landingConfigIsLoading = false;
    }
}
