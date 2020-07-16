import { select } from "redux-saga/effects";

import { State } from "@WsState";
import { WorkspaceStore } from "@ws/redux";

export class WorkspaceSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.workspace;
    }

    static* getPage() {
        const store: WorkspaceStore = yield WorkspaceSelectors.getStore();
        return store.indexPage;
    }

    static* getMenuId() {
        const store: WorkspaceStore = yield WorkspaceSelectors.getStore();
        return store.indexPage.blocks.menu.menuId;
    }
}
