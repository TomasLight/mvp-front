import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@State";

import { MenuActions } from "../redux";
import { Food, IFoodCallProps, IFoodProps } from "./Food";

const mapStateToProps = (state: State): Partial<IFoodProps> => {
    return {
        dishes: state.menu.dishes.filter(dish => dish.tag === state.menu.selectedTagId),
        cart: state.menu.cart,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IFoodCallProps => ({
    openDish: (dishId: number) => dispatch(
        MenuActions.openDishModal({
            dishId,
        })
    ),
    addToCart: (dishId: number, size: number) => dispatch(
        MenuActions.addDishToCart({
            dishId,
            size,
        })
    ),
    increaseAmount: (dishId: number, size: number) => dispatch(
        MenuActions.increaseDishAmountInCart({
            dishId,
            size,
        })
    ),
    decreaseAmount: (dishId: number, size: number) => dispatch(
        MenuActions.decreaseDishAmountInCart({
            dishId,
            size,
        })
    ),
});

const FoodContainer: ComponentType<Partial<IFoodProps>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Food);
export { FoodContainer };
