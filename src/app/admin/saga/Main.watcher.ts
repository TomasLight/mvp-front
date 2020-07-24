import { Watcher } from "app-saga-utils";

import { MainActions } from "../redux";
import { MainSaga } from "./Main.saga";

export class MainWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            MainActions.CHECK_WORKSPACE,
            MainSaga.checkWorkspace
        );
        this.watchLatest(
            MainActions.WORKSPACE_WAS_CREATED,
            MainSaga.workspaceWasCreated
        );
    }
}
