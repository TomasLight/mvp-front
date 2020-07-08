export interface IOpenDishModalData {
    dishId: string;
}

export interface IAddDishToCartData {
    dishId: string;
    size: number;
}

export interface IIncreaseDishAmountInCartData {
    dishId: string;
    size: number;
}

export interface IDecreaseDishAmountInCartData {
    dishId: string;
    size: number;
}

export interface IChangeSelectedCategoryData {
    categoryId: string;
}
