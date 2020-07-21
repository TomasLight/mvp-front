import { select } from "redux-saga/effects";

import { SiteStore } from "@main/Site/redux";
import { State } from "@MainState";

export class SetupSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.site;
    }

    static* getSiteUrl() {
        const store: SiteStore = yield SetupSelectors.getStore();
        return store.siteUrl;
    }
}
