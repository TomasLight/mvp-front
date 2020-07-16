import { WatcherBase } from "@utils/saga/WatcherBase";

import { DataActions } from "../redux";
import { DataSaga } from "./Data.saga";

export class DataWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            DataActions.SUBMIT_SETTINGS,
            DataSaga.submitSettings
        );
    }
}
