import { AppProviderWatcher } from "@shared/templates/AppProvider/saga/AppProvider.watcher";
import { RootSagaBase } from "@utils/saga/RootSagaBase";

// import { IssuesWatcher } from "@app/Menu/saga/Issues.watcher";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),

            // new IssuesWatcher(),
        ]);
    }
}
