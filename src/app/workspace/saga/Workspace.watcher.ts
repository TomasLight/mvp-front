import { Watcher } from "app-saga-utils";

import { WorkspaceActions } from "../redux";
import { WorkspaceSaga } from "./Workspace.saga";

export class WorkspaceWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            WorkspaceActions.LOAD_SETTINGS,
            WorkspaceSaga.loadSettings
        );
    }
}
