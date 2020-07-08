import { WatcherBase } from "@utils/saga/WatcherBase";

import { MenuActions } from "../redux";
import { MenuSaga } from "./Menu.saga";

export class MenuWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            MenuActions.LOAD_MENU,
            MenuSaga.loadMenu
        );
        this.watchLatest(
            MenuActions.LOAD_CATEGORIES,
            MenuSaga.loadCategories
        );
        this.watchLatest(
            MenuActions.LOAD_DISHES,
            MenuSaga.loadDishes
        );

        this.watchLatest(
            MenuActions.OPEN_DISH_MODAL,
            MenuSaga.openDishModal
        );
        this.watchLatest(
            MenuActions.CLOSE_DISH_MODAL,
            MenuSaga.closeDishModal
        );

        this.watchLatest(
            MenuActions.ADD_DISH_TO_CART,
            MenuSaga.addDishToCart
        );
        this.watchLatest(
            MenuActions.INCREASE_DISH_AMOUNT_IN_CART,
            MenuSaga.increaseDishAmountInCart
        );
        this.watchLatest(
            MenuActions.DECREASE_DISH_AMOUNT_IN_CART,
            MenuSaga.decreaseDishAmountInCart
        );

        this.watchLatest(
            MenuActions.CHANGE_SELECTED_CATEGORY,
            MenuSaga.changeSelectedCategory
        );
    }
}
