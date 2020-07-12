import { select } from "redux-saga/effects";

import { PageStore } from "@app/redux";
import { State } from "@WsState";

export class PageSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.page;
    }

    static* getPage() {
        const store: PageStore = yield PageSelectors.getStore();
        return store.indexPage;
    }

    static* getMenuId() {
        const store: PageStore = yield PageSelectors.getStore();
        return store.indexPage.blocks.menu.menuId;
    }
}
