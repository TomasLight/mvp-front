import { createAction } from "app-redux-utils";

import {
    ISetLandingConfigIdData,
    ISetWorkspaceIdData,
} from "./Main.actions.dataTypes";
import { MainStore } from "./Main.store";

export class MainActions {
    static readonly PREFIX = "MAIN_";
    static readonly UPDATE_STORE = MainActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_LANDING_CONFIG = MainActions.PREFIX + "LOAD_LANDING_CONFIG";
    static readonly LOAD_WORKSPACES = MainActions.PREFIX + "LOAD_WORKSPACES";
    static readonly SET_WORKSPACE_ID = MainActions.PREFIX + "SET_WORKSPACE_ID";
    static readonly SET_LANDING_CONFIG_ID = MainActions.PREFIX + "SET_LANDING_CONFIG_ID";

    static updateStore = (partialStore: Partial<MainStore>) =>
        createAction(MainActions.UPDATE_STORE, partialStore);

    static loadLandingConfig = () => createAction(MainActions.LOAD_LANDING_CONFIG);
    static loadWorkspaces = () => createAction(MainActions.LOAD_WORKSPACES);

    static setWorkspaceId = (data: ISetWorkspaceIdData) =>
        createAction(MainActions.SET_WORKSPACE_ID, data);

    static setLandingConfigId = (data: ISetLandingConfigIdData) =>
        createAction(MainActions.SET_LANDING_CONFIG_ID, data);
}
