import { select } from "redux-saga/effects";

import { CommonState } from "@config";

export class AppProviderSelectors {
    public static* getStore() {
        const state: CommonState = yield select();
        return state.appProvider;
    }
}
