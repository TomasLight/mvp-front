import { select } from "@redux-saga/core/effects";
import { State } from "@WsState";

import { Dish } from "../models";
import { MenuStore } from "./Menu.store";

export class MenuStoreSelector {
    static getStore() {
        return select((state: State) => state.menu);
    }

    static* dishes() {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.dishes;
    }

    static* filterDishes(dishId: string) {
        const dishes: Dish[] = yield MenuStoreSelector.dishes();
        return dishes.filter((dish: Dish) => dish.id !== dishId);
    }

    static* getDishById(dishId: string) {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.dishes.find((issue: Dish) => issue.id === dishId);
    }

    static* cart() {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.cart;
    }
}
