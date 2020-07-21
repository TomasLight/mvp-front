import { Dish } from "@ws/Menu/models";
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

    static* dishes() {
        const store: MenuStore = yield MenuSelectors.getStore();
        return store.dishes;
    }

    static* filterDishes(dishId: string) {
        const dishes: Dish[] = yield MenuSelectors.dishes();
        return dishes.filter((dish: Dish) => dish.id !== dishId);
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
