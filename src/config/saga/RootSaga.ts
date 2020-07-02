import { RootSagaBase } from "@utils/saga";
import { AppProviderWatcher } from "@shared/templates/AppProvider/saga";

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
