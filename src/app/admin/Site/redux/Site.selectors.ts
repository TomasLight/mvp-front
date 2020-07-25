import { select } from "redux-saga/effects";

import { SiteStore } from "./Site.store";
import { State } from "@AdminState";

export class SiteSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.site;
    }

    static* getSiteUrl() {
        const store: SiteStore = yield SiteSelectors.getStore();
        return store.siteUrl;
    }
}
