import { WatcherBase } from "@utils/saga/WatcherBase";

import { MainActions } from "../redux";
import { MainSaga } from "./Main.saga";

export class MainWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            MainActions.LOAD_WORKSPACES,
            MainSaga.loadWorkspaces
        );
    }
}
