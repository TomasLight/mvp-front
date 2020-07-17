import { Watcher } from "app-saga-utils";

import { MainActions } from "../redux";
import { MainSaga } from "./Main.saga";

export class MainWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            MainActions.LOAD_LANDING_CONFIG,
            MainSaga.loadLandingConfig
        );
        this.watchLatest(
            MainActions.LOAD_WORKSPACES,
            MainSaga.loadWorkspaces
        );
        this.watchLatest(
            MainActions.SET_WORKSPACE_ID,
            MainSaga.setWorkspaceId
        );
        this.watchLatest(
            MainActions.SET_LANDING_CONFIG_ID,
            MainSaga.setLandingConfigId
        );
    }
}
