import { select } from "redux-saga/effects";

import { MenuStore } from "@ws/Menu/redux";
import { State } from "@WsState";

export class MenuSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.menu;
    }

    static* getCategories() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.categories;
    }
}
