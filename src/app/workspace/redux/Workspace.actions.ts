import { createAction } from "app-redux-utils";

import { WorkspaceStore } from "./Workspace.store";

export class WorkspaceActions {
    static readonly PREFIX = "WORKSPACE_";
    static readonly UPDATE_STORE = WorkspaceActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_WORKSPACE = WorkspaceActions.PREFIX + "LOAD_WORKSPACE";

    static updateStore = (partialStore: Partial<WorkspaceStore>) =>
        createAction(WorkspaceActions.UPDATE_STORE, partialStore);

    static loadWorkspace = () => createAction(WorkspaceActions.LOAD_WORKSPACE);
}
