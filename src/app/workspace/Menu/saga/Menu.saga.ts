import { AppAction } from "app-redux-utils";
import { call, put } from "@redux-saga/core/effects";

import { SagaBase } from "@config/saga";
import { DataFailed } from "@utils/data";
import { DataService } from "@ws/data";
import { Cart, Category, Dish } from "../models";
import {
    IAddDishToCartData,
    IChangeSelectedCategoryData,
    IDecreaseDishAmountInCartData,
    IIncreaseDishAmountInCartData,
    IOpenDishModalData,
    MenuActions,
    MenuStore,
    MenuSelectors,
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

        const categories: DataFailed | Category[] = yield call(DataService.menu.categoriesAsync);
        if (categories instanceof DataFailed) {
            yield MenuSaga.updateStore({
                categoriesAreLoading: false,
            });
            yield SagaBase.displayClientError(categories);
            return;
        }

        yield MenuSaga.updateStore({
            categoriesAreLoading: false,
            categories,
            selectedCategory: categories.length ? categories[0] : null,
        });
    }

    static* loadDishes(action: AppAction) {
        yield MenuSaga.updateStore({
            dishesAreLoading: true,
        });

        const dishes: DataFailed | Dish[] = yield call(DataService.menu.dishesAsync);
        if (dishes instanceof DataFailed) {
            yield MenuSaga.updateStore({
                dishesAreLoading: false,
            });
            yield SagaBase.displayClientError(dishes);
            return;
        }

        yield MenuSaga.updateStore({
            dishesAreLoading: false,
            dishes,
        });
    }

    static* openDishModal(action: AppAction<IOpenDishModalData>) {
        const { dishId } = action.payload;
        yield MenuSaga.updateStore({
            openedDishIsLoading: true,
        });

        yield MenuSaga.preloadDish(dishId);

        const dish: DataFailed | Dish = yield call(DataService.menu.dishByIdAsync, dishId);
        if (dish instanceof DataFailed) {
            yield MenuSaga.updateStore({
                dishesAreLoading: false,
            });
            yield SagaBase.displayClientError(dish);
            return;
        }

        yield MenuSaga.updateStore({
            openedDish: dish,
            openedDishIsLoading: false,
        });

        yield MenuSaga.updateDishInStore(dish);
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
        const storedDish: Dish[] = yield MenuSelectors.dishes();
        if (storedDish.every((dish: Dish) => dish.id !== changedDish.id)) {
            storedDish.push(changedDish);
        }

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
