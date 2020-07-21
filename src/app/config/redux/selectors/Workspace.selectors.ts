import { select } from "redux-saga/effects";

import { State } from "@WsState";
import { WorkspaceStore } from "@ws/redux";

export class WorkspaceSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.workspace;
    }

    static* getMenuId() {
        const store: WorkspaceStore = yield WorkspaceSelectors.getStore();
        return store.menuId;
    }
}
