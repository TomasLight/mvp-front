import { select } from "redux-saga/effects";

import { MenuStore } from "@pos/Menu/redux";
import { State } from "@PosState";

export class MenuSelectors {
    public static* getStore() {
        const state: State = yield select();
        return state.menu;
    }

    public static* getCategories() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.categories;
    }
}
