export interface IOpenDishModalData {
    dishId: number;
}

export interface IAddDishToCartData {
    dishId: number;
    size: number;
}

export interface IIncreaseDishAmountInCartData {
    dishId: number;
    size: number;
}

export interface IDecreaseDishAmountInCartData {
    dishId: number;
    size: number;
}

export interface IChangeSelectedTagData {
    tagId: number;
}
