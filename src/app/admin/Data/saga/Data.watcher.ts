import { Watcher } from "app-saga-utils";

import { DataActions } from "../redux";
import { DataSaga } from "./Data.saga";

export class DataWatcher extends Watcher {
    constructor() {
        super();
        const saga = new DataSaga();

        this.watchLatest(
            DataActions.SUBMIT_SETTINGS,
            saga.submitSettings
        );
    }
}
