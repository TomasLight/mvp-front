import { select } from "redux-saga/effects";

import { CommonState } from "@CommonState";

export class AppProviderSelectors {
    static* getStore() {
        const state: CommonState = yield select();
        return state.appProvider;
    }
}
