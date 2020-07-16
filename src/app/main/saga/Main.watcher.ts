import { WatcherBase } from "@utils/saga/WatcherBase";

import { MainActions } from "../redux";
import { MainSaga } from "./Main.saga";

export class MainWatcher extends WatcherBase {
    constructor() {
        super();

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
