import { MenuSelectors, PosSelectors } from "@selectors";
import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { MenuApi } from "@api";
import { ApiResponse } from "@utils/api/ApiResponse";
import { SagaBase } from "@utils/saga/SagaBase";

import { Cart, Category, Dish, Menu } from "../models";
import {
    MenuActions,
    MenuStoreSelector,
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

    public static* loadMenu(action: AppAction) {
        // now we no need menu information

        // yield MenuSaga.updateStore({
        //     menuIsLoading: true,
        // });
        //
        // const menuId = yield PosSelectors.getMenuId();
        // const response: ApiResponse<Menu> = yield MenuApi.getMenu(menuId);
        // if (response.hasError()) {
        //     yield MenuSaga.updateStore({
        //         menuIsLoading: false,
        //     });
        //     yield SagaBase.displayClientError(response);
        //     return;
        // }
        //
        // yield MenuSaga.updateStore({
        //     menuIsLoading: false,
        //     menu: response.data,
        // });

        yield put(MenuActions.loadCategories());
        yield put(MenuActions.loadDishes());
    }

    public static* loadCategories(action: AppAction) {
        yield MenuSaga.updateStore({
            categoriesAreLoading: true,
        });

        const menuId = yield PosSelectors.getMenuId();
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

    public static* loadDishes(action: AppAction) {
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

    public static* openDishModal(action: AppAction<IOpenDishModalData>) {
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
        const dish: Dish = yield MenuStoreSelector.getDishById(dishId);
        if (dish) {
            yield MenuSaga.updateStore({
                openedDish: dish,
            });
        }
    }

    private static* updateDishInStore(changedDish: Dish) {
        const storedDish: Dish[] = yield MenuStoreSelector.filterDishes(changedDish.id);
        storedDish.push(changedDish);

        yield MenuSaga.updateStore({
            dishes: storedDish,
        });
    }

    public static* closeDishModal(action: AppAction) {
        yield MenuSaga.updateStore({
            openedDish: null,
        });
    }

    public static* addDishToCart(action: AppAction<IAddDishToCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuStoreSelector.cart();
        cart.add(dishId, size);

        yield MenuSaga.updateStore({
            cart,
        });
    }

    public static* increaseDishAmountInCart(action: AppAction<IIncreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuStoreSelector.cart();
        cart.adjust({
            id: dishId,
            size,
            amount: 1,
        });

        yield MenuSaga.updateStore({
            cart,
        });
    }

    public static* decreaseDishAmountInCart(action: AppAction<IDecreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuStoreSelector.cart();
        cart.reduce({
            id: dishId,
            size,
            amount: 1,
        });

        yield MenuSaga.updateStore({
            cart,
        });
    }

    public static* changeSelectedCategory(action: AppAction<IChangeSelectedCategoryData>) {
        const { categoryId } = action.payload;

        const categories: Category[] = yield MenuSelectors.getCategories();
        const selectedCategory = categories.find(category => category.id === categoryId);
        yield MenuSaga.updateStore({
            selectedCategory,
        });
    }
}
