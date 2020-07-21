import { RootSaga } from "app-saga-utils";

import { AppProviderWatcher } from "@app/AppProvider/saga/AppProvider.watcher";
import { UserWatcher } from "@app/saga/User.watcher";

export class RootSagaBase extends RootSaga {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new UserWatcher(),
        ]);
    }
}
