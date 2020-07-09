import { createAction } from "app-redux-utils";

import {
    IAddDishToCartData,
    IChangeSelectedCategoryData,
    IDecreaseDishAmountInCartData,
    IIncreaseDishAmountInCartData,
    IOpenDishModalData
} from "./Menu.actions.dataTypes";
import { MenuStore } from "./Menu.store";

export class MenuActions {
    static readonly PREFIX = "MENU_";
    static readonly UPDATE_STORE = MenuActions.PREFIX + "UPDATE_STORE";

    static readonly LOAD_MENU = MenuActions.PREFIX + "LOAD_MENU";
    static readonly LOAD_CATEGORIES = MenuActions.PREFIX + "LOAD_CATEGORIES";
    static readonly LOAD_DISHES = MenuActions.PREFIX + "LOAD_DISHES";

    static readonly OPEN_DISH_MODAL = MenuActions.PREFIX + "OPEN_DISH_MODAL";
    static readonly CLOSE_DISH_MODAL = MenuActions.PREFIX + "CLOSE_DISH_MODAL";

    static readonly ADD_DISH_TO_CART = MenuActions.PREFIX + "ADD_DISH_TO_CART";
    static readonly INCREASE_DISH_AMOUNT_IN_CART = MenuActions.PREFIX + "INCREASE_DISH_AMOUNT_IN_CART";
    static readonly DECREASE_DISH_AMOUNT_IN_CART = MenuActions.PREFIX + "DECREASE_DISH_AMOUNT_IN_CART";

    static readonly CHANGE_SELECTED_CATEGORY = MenuActions.PREFIX + "CHANGE_SELECTED_CATEGORY";

    static updateStore = (partialStore: Partial<MenuStore>) =>
        createAction(MenuActions.UPDATE_STORE, partialStore);

    static loadMenu = () => createAction(MenuActions.LOAD_MENU);
    static loadCategories = () => createAction(MenuActions.LOAD_CATEGORIES);
    static loadDishes = () => createAction(MenuActions.LOAD_DISHES);

    static openDishModal = (data: IOpenDishModalData) =>
        createAction(MenuActions.OPEN_DISH_MODAL, data);

    static closeDishModal = () => createAction(MenuActions.CLOSE_DISH_MODAL);

    static addDishToCart = (data: IAddDishToCartData) =>
        createAction(MenuActions.ADD_DISH_TO_CART, data);

    static increaseDishAmountInCart = (data: IIncreaseDishAmountInCartData) =>
        createAction(MenuActions.INCREASE_DISH_AMOUNT_IN_CART, data);

    static decreaseDishAmountInCart = (data: IDecreaseDishAmountInCartData) =>
        createAction(MenuActions.DECREASE_DISH_AMOUNT_IN_CART, data);

    static changeSelectedCategory = (data: IChangeSelectedCategoryData) =>
        createAction(MenuActions.CHANGE_SELECTED_CATEGORY, data);
}
