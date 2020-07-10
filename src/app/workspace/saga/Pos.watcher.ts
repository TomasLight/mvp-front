import { WatcherBase } from "@utils/saga/WatcherBase";

import { PosActions } from "../redux";
import { PosSaga } from "./Pos.saga";

export class PosWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            PosActions.LOAD_PAGE,
            PosSaga.loadPage
        );
    }
}
