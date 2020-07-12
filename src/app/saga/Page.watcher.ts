import { WatcherBase } from "@utils/saga/WatcherBase";

import { PageActions } from "../redux";
import { PageSaga } from "./Page.saga";

export class PageWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            PageActions.LOAD_PAGE,
            PageSaga.loadPage
        );
    }
}
