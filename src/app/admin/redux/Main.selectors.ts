import { select } from "redux-saga/effects";

import { LandingConfig } from "@models";
import { State } from "@AdminState";
import { MainStore } from "./Main.store";

export class MainSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.main;
    }

    static* getHasWorkspace() {
        const store: MainStore = yield MainSelectors.getStore();
        return store.hasWorkspace;
    }

    static* getSettingsMode() {
        const store: MainStore = yield MainSelectors.getStore();
        return store.settingsMode;
    }

    static* getLandingConfig() {
        const store: MainStore = yield MainSelectors.getStore();
        return store.landingConfig;
    }

    static* getWorkspaceId() {
        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        return landingConfig.workspaceId;
    }

    static* getLandingConfigId() {
        const landingConfig: LandingConfig = yield MainSelectors.getLandingConfig();
        return landingConfig.id;
    }
}
