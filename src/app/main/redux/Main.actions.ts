import { createAction, createActionWithCallback } from "app-redux-utils";

import { MainStore } from "./Main.store";

export class MainActions {
    static readonly PREFIX = "MAIN_";
    static readonly UPDATE_STORE = MainActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_WORKSPACES = MainActions.PREFIX + "LOAD_WORKSPACES";

    static updateStore = (partialStore: Partial<MainStore>) =>
        createAction(MainActions.UPDATE_STORE, partialStore);

    static loadWorkspaces = () => createActionWithCallback(MainActions.LOAD_WORKSPACES);
}
