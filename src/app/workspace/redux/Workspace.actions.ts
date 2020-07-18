import { createAction, createActionWithCallback } from "app-redux-utils";

import { WorkspaceStore } from "./Workspace.store";

export class WorkspaceActions {
    static readonly PREFIX = "WORKSPACE_";
    static readonly UPDATE_STORE = WorkspaceActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_WORKSPACES = WorkspaceActions.PREFIX + "LOAD_WORKSPACES";
    static readonly LOAD_PAGE = WorkspaceActions.PREFIX + "LOAD_PAGE";

    static updateStore = (partialStore: Partial<WorkspaceStore>) =>
        createAction(WorkspaceActions.UPDATE_STORE, partialStore);

    static loadWorkspaces = () => createActionWithCallback(WorkspaceActions.LOAD_WORKSPACES);
    static loadPage = () => createAction(WorkspaceActions.LOAD_PAGE);
}
