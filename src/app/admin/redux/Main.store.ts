import { AuthorizedUser } from "@admin/models";
import { LandingConfig } from "@app/models";

export class MainStore {
    appIsInitialized: boolean;
    authorizedUser: AuthorizedUser;

    workspacesAreLoading: boolean;
    settingsMode: "create" | "update";

    hasWorkspace: boolean;
    landingConfig: LandingConfig;
    landingConfigIsLoading: boolean;

    constructor() {
        this.appIsInitialized = false;
        this.authorizedUser = new AuthorizedUser();

        this.workspacesAreLoading = false;
        this.settingsMode = "update";

        this.hasWorkspace = false;
        this.landingConfig = new LandingConfig();
        this.landingConfigIsLoading = false;
    }
}
