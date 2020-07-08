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
    public static readonly PREFIX = "MENU_";
    public static readonly UPDATE_STORE = MenuActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_MENU = MenuActions.PREFIX + "LOAD_MENU";
    public static readonly LOAD_CATEGORIES = MenuActions.PREFIX + "LOAD_CATEGORIES";
    public static readonly LOAD_DISHES = MenuActions.PREFIX + "LOAD_DISHES";

    public static readonly OPEN_DISH_MODAL = MenuActions.PREFIX + "OPEN_DISH_MODAL";
    public static readonly CLOSE_DISH_MODAL = MenuActions.PREFIX + "CLOSE_DISH_MODAL";

    public static readonly ADD_DISH_TO_CART = MenuActions.PREFIX + "ADD_DISH_TO_CART";
    public static readonly INCREASE_DISH_AMOUNT_IN_CART = MenuActions.PREFIX + "INCREASE_DISH_AMOUNT_IN_CART";
    public static readonly DECREASE_DISH_AMOUNT_IN_CART = MenuActions.PREFIX + "DECREASE_DISH_AMOUNT_IN_CART";

    public static readonly CHANGE_SELECTED_CATEGORY = MenuActions.PREFIX + "CHANGE_SELECTED_CATEGORY";

    public static updateStore = (partialStore: Partial<MenuStore>) =>
        createAction(MenuActions.UPDATE_STORE, partialStore);

    public static loadMenu = () => createAction(MenuActions.LOAD_MENU);
    public static loadCategories = () => createAction(MenuActions.LOAD_CATEGORIES);
    public static loadDishes = () => createAction(MenuActions.LOAD_DISHES);

    public static openDishModal = (data: IOpenDishModalData) =>
        createAction(MenuActions.OPEN_DISH_MODAL, data);

    public static closeDishModal = () => createAction(MenuActions.CLOSE_DISH_MODAL);

    public static addDishToCart = (data: IAddDishToCartData) =>
        createAction(MenuActions.ADD_DISH_TO_CART, data);

    public static increaseDishAmountInCart = (data: IIncreaseDishAmountInCartData) =>
        createAction(MenuActions.INCREASE_DISH_AMOUNT_IN_CART, data);

    public static decreaseDishAmountInCart = (data: IDecreaseDishAmountInCartData) =>
        createAction(MenuActions.DECREASE_DISH_AMOUNT_IN_CART, data);

    public static changeSelectedCategory = (data: IChangeSelectedCategoryData) =>
        createAction(MenuActions.CHANGE_SELECTED_CATEGORY, data);
}
