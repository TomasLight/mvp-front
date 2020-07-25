import { createAction } from "app-redux-utils";

import { AppProviderStore } from "./AppProvider.store";

export class AppProviderActions {
    private static readonly PREFIX = "APP_PROVIDER_";

    static readonly UPDATE_STORE = AppProviderActions.PREFIX + "UPDATE_STORE";

    static readonly INCREMENT_INITIALIZED_ACTIONS = AppProviderActions.PREFIX + "INCREMENT_INITIALIZED_ACTIONS";

    static readonly INITIALIZE_MAIN_APP = AppProviderActions.PREFIX + "INITIALIZE_MAIN_APP";

    static readonly GET_AUTHORIZED_USER = AppProviderActions.PREFIX + "GET_AUTHORIZED_USER";

    static updateStore = (partialStore: Partial<AppProviderStore>) =>
        createAction(AppProviderActions.UPDATE_STORE, partialStore);

    static incrementInitializedActions = () => createAction(AppProviderActions.INCREMENT_INITIALIZED_ACTIONS);

    static initializedMainApp = () => createAction(AppProviderActions.INITIALIZE_MAIN_APP);

    static getAuthorizedUser = () =>
        createAction(AppProviderActions.GET_AUTHORIZED_USER);
}
