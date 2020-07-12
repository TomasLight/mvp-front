import { select } from "redux-saga/effects";

import { SetupStore } from "@main/Setup/redux";
import { State } from "@MainState";

export class SetupSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.setup;
    }

    static* getSiteUrl() {
        const store: SetupStore = yield SetupSelectors.getStore();
        return store.siteUrl;
    }
}
