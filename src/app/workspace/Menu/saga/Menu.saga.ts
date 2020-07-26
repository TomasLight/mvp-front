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

function* updateStore(partialStore: Partial<MenuStore>) {
    yield put(MenuActions.updateStore(partialStore));
}

function* preloadDish(dishId: string) {
    const dish: Dish = yield MenuSelectors.getDishById(dishId);
    if (dish) {
        yield updateStore({
            openedDish: dish,
        });
    }
}

function* updateDishInStore(changedDish: Dish) {
    const storedDish: Dish[] = yield MenuSelectors.dishes();
    if (storedDish.every((dish: Dish) => dish.id !== changedDish.id)) {
        storedDish.push(changedDish);
    }

    yield updateStore({
        dishes: storedDish,
    });
}

export class MenuSaga extends SagaBase {
    constructor() {
        super();
        this.loadCategories = this.loadCategories.bind(this);
        this.loadDishes = this.loadDishes.bind(this);
        this.openDishModal = this.openDishModal.bind(this);
    }

    * loadMenu(action: AppAction) {
        yield put(MenuActions.loadCategories());
        yield put(MenuActions.loadDishes());
    }

    * loadCategories(action: AppAction) {
        yield updateStore({
            categoriesAreLoading: true,
        });

        const categories: DataFailed | Category[] = yield call(DataService.menu.categoriesAsync);
        if (categories instanceof DataFailed) {
            yield updateStore({
                categoriesAreLoading: false,
            });
            yield this.displayClientError(categories);
            return;
        }

        yield updateStore({
            categoriesAreLoading: false,
            categories,
            selectedCategory: categories.length ? categories[0] : null,
        });
    }

    * loadDishes(action: AppAction) {
        yield updateStore({
            dishesAreLoading: true,
        });

        const dishes: DataFailed | Dish[] = yield call(DataService.menu.dishesAsync);
        if (dishes instanceof DataFailed) {
            yield updateStore({
                dishesAreLoading: false,
            });
            yield this.displayClientError(dishes);
            return;
        }

        yield updateStore({
            dishesAreLoading: false,
            dishes,
        });
    }

    * openDishModal(action: AppAction<IOpenDishModalData>) {
        const { dishId } = action.payload;
        yield updateStore({
            openedDishIsLoading: true,
        });

        yield preloadDish(dishId);

        const dish: DataFailed | Dish = yield call(DataService.menu.dishByIdAsync, dishId);
        if (dish instanceof DataFailed) {
            yield updateStore({
                dishesAreLoading: false,
            });
            yield this.displayClientError(dish);
            return;
        }

        yield updateStore({
            openedDish: dish,
            openedDishIsLoading: false,
        });

        yield updateDishInStore(dish);
    }

    * closeDishModal(action: AppAction) {
        yield updateStore({
            openedDish: null,
        });
    }

    * addDishToCart(action: AppAction<IAddDishToCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.add(dishId, size);

        yield updateStore({
            cart,
        });
    }

    * increaseDishAmountInCart(action: AppAction<IIncreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.adjust({
            id: dishId,
            size,
            amount: 1,
        });

        yield updateStore({
            cart,
        });
    }

    * decreaseDishAmountInCart(action: AppAction<IDecreaseDishAmountInCartData>) {
        const { dishId, size } = action.payload;

        const cart: Cart = yield MenuSelectors.cart();
        cart.reduce({
            id: dishId,
            size,
            amount: 1,
        });

        yield updateStore({
            cart,
        });
    }

    * changeSelectedCategory(action: AppAction<IChangeSelectedCategoryData>) {
        const { categoryId } = action.payload;

        const categories: Category[] = yield MenuSelectors.getCategories();
        const selectedCategory = categories.find(category => category.id === categoryId);
        yield updateStore({
            selectedCategory,
        });
    }
}
