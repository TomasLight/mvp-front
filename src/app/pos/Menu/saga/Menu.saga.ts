import { AppAction } from "app-redux-utils";
import { put } from "@redux-saga/core/effects";

import { MenuApi } from "@api";
import { ApiResponse } from "@utils/api/ApiResponse";
import { SagaBase } from "@utils/saga/SagaBase";

import { Cart, Dish, DishDetails } from "../models";
import {
    MenuActions,
    MenuStoreSelector,
    MenuStore,
    IAddDishToCartData,
    IChangeSelectedTagData,
    IDecreaseDishAmountInCartData,
    IIncreaseDishAmountInCartData,
    IOpenDishModalData
} from "../redux";

export class MenuSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<MenuStore>) {
        yield put(MenuActions.updateStore(partialStore));
    }

    public static* loadTags(action: AppAction) {
        yield MenuSaga.updateStore({
            tagIdsAreLoading: true,
        });

        const response: ApiResponse<number[]> = yield MenuApi.getDishTagIds();
        if (response.hasError()) {
            yield MenuSaga.updateStore({
                tagIdsAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield MenuSaga.updateStore({
            tagIdsAreLoading: false,
            tagIds: response.data,
            selectedTagId: response.data.length ? response.data[0] : null,
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

        const response: ApiResponse<DishDetails> = yield MenuApi.getDish(dishId);
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

    private static* preloadDish(dishId: number) {
        const dish: DishDetails = yield MenuStoreSelector.getDishById(dishId);
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

    public static* changeSelectedTag(action: AppAction<IChangeSelectedTagData>) {
        const { tagId } = action.payload;

        yield MenuSaga.updateStore({
            selectedTagId: tagId,
        });
    }
}
