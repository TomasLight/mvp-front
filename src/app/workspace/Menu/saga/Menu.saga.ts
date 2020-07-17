import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { MenuApi } from "@api";
import { MenuSelectors, WorkspaceSelectors } from "@selectors";
import { ApiResponse } from "@utils/api";
import { SagaBase } from "@config/saga";

import { Cart, Category, Dish } from "../models";
import {
    MenuActions,
    MenuStore,
    IAddDishToCartData,
    IChangeSelectedCategoryData,
    IDecreaseDishAmountInCartData,
    IIncreaseDishAmountInCartData,
    IOpenDishModalData
} from "../redux";

export class MenuSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<MenuStore>) {
        yield put(MenuActions.updateStore(partialStore));
    }

    static* loadMenu(action: AppAction) {
        yield put(MenuActions.loadCategories());
        yield put(MenuActions.loadDishes());
    }

    static* loadCategories(action: AppAction) {
        yield MenuSaga.updateStore({
            categoriesAreLoading: true,
        });

        const menuId = yield WorkspaceSelectors.getMenuId();
        const response: ApiResponse<Category[]> = yield MenuApi.getCategories(menuId);
        if (response.hasError()) {
            yield MenuSaga.updateStore({
                categoriesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield MenuSaga.updateStore({
            categoriesAreLoading: false,
            categories: response.data,
            selectedCategory: response.data.length ? response.data[0] : null,
        });
    }

    static* loadDishes(action: AppAction) {
        yield MenuSaga.updateStore({
            dishesAreLoading: true,
        });

        const response: ApiResponse<Dish[]> = yield MenuApi.getDishes();
        if (response.hasError()) {
            yield MenuSaga.updateStore({
                dishesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield MenuSaga.updateStore({
            dishesAreLoading: false,
            dishes: response.data,
        });
    }

    static* openDishModal(action: AppAction<IOpenDishModalData>) {
        const { dishId } = action.payload;
        yield MenuSaga.updateStore({
            openedDishIsLoading: true,
        });

        yield MenuSaga.preloadDish(dishId);

        const response: ApiResponse<Dish> = yield MenuApi.getMenuItem(dishId);
        if (response.hasError()) {
            yield MenuSaga.updateStore({
                openedDishIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield MenuSaga.updateStore({
            openedDish: response.data,
            openedDishIsLoading: false,
        });

        yield MenuSaga.updateDishInStore(response.data);
    }

    private static* preloadDish(dishId: string) {
        const dish: Dish = yield MenuSelectors.getDishById(dishId);
        if (dish) {
            yield MenuSaga.updateStore({
                openedDish: dish,
            });
        }
    }

    private static* updateDishInStore(changedDish: Dish) {
        const storedDish: Dish[] = yield MenuSelectors.filterDishes(changedDish.id);
        storedDish.push(changedDish);

        yield MenuSaga.updateStore({
            dishes: storedDish,
        });
    }

    static* closeDishModal(action: AppAction) {
        yield MenuSaga.updateStore({
            openedDish: null,
        });
    }

    static* addDishToCart(action: AppAction<IAddDishToCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.add(dishId, size);

        yield MenuSaga.updateStore({
            cart,
        });
    }

    static* increaseDishAmountInCart(action: AppAction<IIncreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.adjust({
            id: dishId,
            size,
            amount: 1,
        });

        yield MenuSaga.updateStore({
            cart,
        });
    }

    static* decreaseDishAmountInCart(action: AppAction<IDecreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.reduce({
            id: dishId,
            size,
            amount: 1,
        });

        yield MenuSaga.updateStore({
            cart,
        });
    }

    static* changeSelectedCategory(action: AppAction<IChangeSelectedCategoryData>) {
        const { categoryId } = action.payload;

        const categories: Category[] = yield MenuSelectors.getCategories();
        const selectedCategory = categories.find(category => category.id === categoryId);
        yield MenuSaga.updateStore({
            selectedCategory,
        });
    }
}
