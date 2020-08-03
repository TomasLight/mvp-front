import { createAction } from "app-redux-utils";

import {
    ISubmitSettingsData,
} from "./Import.actions.dataTypes";
import { ImportStore } from "./Import.store";

export class ImportActions {
    static readonly PREFIX = "DATA_";
    static readonly UPDATE_STORE = ImportActions.PREFIX + "UPDATE_STORE";

    static readonly SUBMIT_SETTINGS = ImportActions.PREFIX + "SUBMIT_SETTINGS";
    static readonly SKIP_IMPORT = ImportActions.PREFIX + "SKIP_IMPORT";

    static updateStore = (partialStore: Partial<ImportStore>) =>
        createAction(ImportActions.UPDATE_STORE, partialStore);

    static submitSettings = (data: ISubmitSettingsData) =>
        createAction(ImportActions.SUBMIT_SETTINGS, data);

    static skipImport = () => createAction(ImportActions.SKIP_IMPORT);
}
