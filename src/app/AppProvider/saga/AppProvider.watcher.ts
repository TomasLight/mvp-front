import { Watcher } from "app-saga-utils";

import { AppProviderActions } from "../redux";
import { AppProviderSaga } from "./AppProvider.saga";

export class AppProviderWatcher extends Watcher {
    constructor() {
        super();

        this.watchEvery(
            AppProviderActions.INCREMENT_INITIALIZED_ACTIONS,
            AppProviderSaga.incrementInitializedActions
        );
        this.watchLatest(
            AppProviderActions.INITIALIZE_MAIN_APP,
            AppProviderSaga.initializeMainApp
        );
        this.watchLatest(
            AppProviderActions.INITIALIZE_POS_APP,
            AppProviderSaga.initializePosApp
        );
        this.watchLatest(
            AppProviderActions.INITIALIZE_WORKSPACE_APP,
            AppProviderSaga.initializedWorkspaceApp
        );
        this.watchLatest(
            AppProviderActions.GET_AUTHORIZED_USER,
            AppProviderSaga.getAuthorizedUser
        );
    }
}
