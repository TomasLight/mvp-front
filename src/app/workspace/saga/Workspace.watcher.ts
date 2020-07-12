import { WatcherBase } from "@utils/saga/WatcherBase";

import { WorkspaceActions } from "../redux";
import { WorkspaceSaga } from "./Workspace.saga";

export class WorkspaceWatcher extends WatcherBase {
    constructor() {
        super();

        // this.watchLatest(
        //     WorkspaceActions.LOAD_PAGE,
        //     WorkspaceSaga.loadPage
        // );
    }
}
