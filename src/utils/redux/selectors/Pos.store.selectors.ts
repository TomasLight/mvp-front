import { PosStore } from "@pos/redux";
import { select } from "redux-saga/effects";

import { State } from "@PosState";

export class PosSelectors {
    public static* getStore() {
        const state: State = yield select();
        return state.pos;
    }

    public static* getPage() {
        const store: PosStore = yield PosSelectors.getStore();
        return store.page;
    }

    public static* getMenuId() {
        const store: PosStore = yield PosSelectors.getStore();
        return store.page.blocks.menu.menuId;
    }
}
