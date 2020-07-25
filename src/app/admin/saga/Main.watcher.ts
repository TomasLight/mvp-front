import { Watcher } from "app-saga-utils";

import { MainActions } from "../redux";
import { MainSaga } from "./Main.saga";

export class MainWatcher extends Watcher {
    constructor() {
        super();
        const saga = new MainSaga();

        this.watchLatest(
            MainActions.CHECK_USER_AUTHORIZATION,
            saga.checkUserAuthorization
        );
        this.watchLatest(
            MainActions.CHECK_WORKSPACE,
            saga.checkWorkspace
        );
        this.watchLatest(
            MainActions.WORKSPACE_WAS_CREATED,
            saga.workspaceWasCreated
        );
    }
}
