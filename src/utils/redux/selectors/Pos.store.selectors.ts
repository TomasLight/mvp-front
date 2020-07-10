import { PosStore } from "@ws/redux";
import { select } from "redux-saga/effects";

import { State } from "@WsState";

export class PosSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.pos;
    }

    static* getPage() {
        const store: PosStore = yield PosSelectors.getStore();
        return store.page;
    }

    static* getMenuId() {
        const store: PosStore = yield PosSelectors.getStore();
        return store.page.blocks.menu.menuId;
    }
}
