import { Watcher } from "app-saga-utils";

import { WorkspaceActions } from "../redux";
import { WorkspaceSaga } from "./Workspace.saga";

export class WorkspaceWatcher extends Watcher {
    constructor() {
        super();
        const saga = new WorkspaceSaga();

        this.watchLatest(
            WorkspaceActions.LOAD_SETTINGS,
            saga.loadSettings
        );
    }
}
