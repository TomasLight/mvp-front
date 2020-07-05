import { select } from "@redux-saga/core/effects";
import { State } from "@PosState";

import { Dish } from "../models";
import { MenuStore } from "./Menu.store";

export class MenuStoreSelector {
    public static getStore() {
        return select((state: State) => state.menu);
    }

    public static* dishes() {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.dishes;
    }

    public static* filterDishes(dishId: number) {
        const dishes: Dish[] = yield MenuStoreSelector.dishes();
        return dishes.filter((dish: Dish) => dish.id !== dishId);
    }

    public static* getDishById(dishId: number) {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.dishes.find((issue: Dish) => issue.id === dishId);
    }

    public static* cart() {
        const store: MenuStore = yield MenuStoreSelector.getStore();
        return store.cart;
    }
}
