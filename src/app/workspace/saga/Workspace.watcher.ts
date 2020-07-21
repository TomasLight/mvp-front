import { Watcher } from "app-saga-utils";

import { WorkspaceActions } from "../redux";
import { WorkspaceSaga } from "./Workspace.saga";

export class WorkspaceWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            WorkspaceActions.LOAD_WORKSPACE,
            WorkspaceSaga.loadWorkspace
        );
        // this.watchLatest(
        //     WorkspaceActions.LOAD_PAGE,
        //     WorkspaceSaga.loadPage
        // );
    }
}
