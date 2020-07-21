import { Watcher } from "app-saga-utils";

import { DataActions } from "../redux";
import { DataSaga } from "./Data.saga";

export class DataWatcher extends Watcher {
    constructor() {
        super();

        this.watchLatest(
            DataActions.SUBMIT_SETTINGS,
            DataSaga.submitSettings
        );
    }
}
