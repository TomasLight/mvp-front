import { createAction } from "app-redux-utils";

import {
    ISubmitSettingsData,
} from "./Data.actions.dataTypes";
import { DataStore } from "./Data.store";

export class DataActions {
    static readonly PREFIX = "DATA_";
    static readonly UPDATE_STORE = DataActions.PREFIX + "UPDATE_STORE";

    static readonly SUBMIT_SETTINGS = DataActions.PREFIX + "SUBMIT_SETTINGS";

    static updateStore = (partialStore: Partial<DataStore>) =>
        createAction(DataActions.UPDATE_STORE, partialStore);

    static submitSettings = (data: ISubmitSettingsData) =>
        createAction(DataActions.SUBMIT_SETTINGS, data);
}
