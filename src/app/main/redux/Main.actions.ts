import { createAction } from "app-redux-utils";

import { MainStore } from "./Main.store";

export class MainActions {
    static readonly PREFIX = "MAIN_";
    static readonly UPDATE_STORE = MainActions.PREFIX + "UPDATE_STORE";

    static readonly CHECK_WORKSPACE = MainActions.PREFIX + "CHECK_WORKSPACE";
    static readonly WORKSPACE_WAS_CREATED = MainActions.PREFIX + "WORKSPACE_WAS_CREATED";

    static updateStore = (partialStore: Partial<MainStore>) =>
        createAction(MainActions.UPDATE_STORE, partialStore);

    static checkWorkspace = () => createAction(MainActions.CHECK_WORKSPACE);
    static workspaceWasCreated = () => createAction(MainActions.WORKSPACE_WAS_CREATED);
}
