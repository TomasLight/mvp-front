import { select } from "redux-saga/effects";

import { State } from "@MainState";
import { MainStore } from "@main/redux";

export class MainSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.main;
    }

    static* getSettingsMode() {
        const store: MainStore = yield MainSelectors.getStore();
        return store.settingsMode;
    }
}
