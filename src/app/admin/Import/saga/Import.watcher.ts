import { Watcher } from "app-saga-utils";

import { ImportActions } from "../redux";
import { ImportSaga } from "./Import.saga";

export class ImportWatcher extends Watcher {
    constructor() {
        super();
        const saga = new ImportSaga();

        this.watchLatest(
            ImportActions.SUBMIT_SETTINGS,
            saga.submitSettings
        );
    }
}
