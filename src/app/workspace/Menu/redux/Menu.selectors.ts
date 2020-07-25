import { select } from "redux-saga/effects";

import { Dish } from "@ws/Menu/models";
import { State } from "@WsState";
import { MenuStore } from "./Menu.store";

export class MenuSelectors {
    static* getStore() {
        const state: State = yield select();
        return state.menu;
    }

    static* getCategories() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.categories;
    }

    static* dishes() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.dishes;
    }

    static* getDishById(dishId: string) {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.dishes.find((issue: Dish) => issue.id === dishId);
    }

    static* cart() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.cart;
    }
}
