import { createAction, createActionWithCallback } from "app-redux-utils";

import { AppProviderStore } from "./AppProvider.store";

export class AppProviderActions {
    private static readonly PREFIX = "APP_PROVIDER_";

    public static readonly UPDATE_STORE = AppProviderActions.PREFIX + "UPDATE_STORE";

    public static readonly INCREMENT_INITIALIZED_ACTIONS = AppProviderActions.PREFIX + "INCREMENT_INITIALIZED_ACTIONS";

    public static readonly INITIALIZE_MAIN_APP = AppProviderActions.PREFIX + "INITIALIZE_MAIN_APP";
    public static readonly INITIALIZE_POS_APP = AppProviderActions.PREFIX + "INITIALIZE_POS_APP";
    public static readonly INITIALIZE_WORKSPACE_APP = AppProviderActions.PREFIX + "INITIALIZE_WORKSPACE_APP";

    public static readonly GET_AUTHORIZED_USER = AppProviderActions.PREFIX + "GET_AUTHORIZED_USER";

    public static updateStore = (partialStore: Partial<AppProviderStore>) =>
        createAction(AppProviderActions.UPDATE_STORE, partialStore);

    public static incrementInitializedActions = () => createAction(AppProviderActions.INCREMENT_INITIALIZED_ACTIONS);

    public static initializedMainApp = () => createAction(AppProviderActions.INITIALIZE_MAIN_APP);
    public static initializedPosApp = () => createAction(AppProviderActions.INITIALIZE_POS_APP);
    public static initializedWorkspaceApp = () => createAction(AppProviderActions.INITIALIZE_WORKSPACE_APP);

    public static getAuthorizedUser = () => createActionWithCallback(AppProviderActions.GET_AUTHORIZED_USER);
}
