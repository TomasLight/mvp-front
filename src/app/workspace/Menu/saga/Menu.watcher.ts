import { Watcher } from "app-saga-utils";

import { MenuActions } from "../redux";
import { MenuSaga } from "./Menu.saga";

export class MenuWatcher extends Watcher {
    constructor() {
        super();
        const saga = new MenuSaga();

        this.watchLatest(
            MenuActions.LOAD_MENU,
            saga.loadMenu
        );
        this.watchLatest(
            MenuActions.LOAD_CATEGORIES,
            saga.loadCategories
        );
        this.watchLatest(
            MenuActions.LOAD_DISHES,
            saga.loadDishes
        );

        this.watchLatest(
            MenuActions.OPEN_DISH_MODAL,
            saga.openDishModal
        );
        this.watchLatest(
            MenuActions.CLOSE_DISH_MODAL,
            saga.closeDishModal
        );

        this.watchLatest(
            MenuActions.ADD_DISH_TO_CART,
            saga.addDishToCart
        );
        this.watchLatest(
            MenuActions.INCREASE_DISH_AMOUNT_IN_CART,
            saga.increaseDishAmountInCart
        );
        this.watchLatest(
            MenuActions.DECREASE_DISH_AMOUNT_IN_CART,
            saga.decreaseDishAmountInCart
        );

        this.watchLatest(
            MenuActions.CHANGE_SELECTED_CATEGORY,
            saga.changeSelectedCategory
        );
    }
}
