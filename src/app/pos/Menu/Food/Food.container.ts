import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { StyledComponentProps } from "@material-ui/core";
import { State } from "@PosState";

import { MenuActions } from "../redux";
import { Food, FoodClassKey, IFoodCallProps, IFoodProps } from "./Food";

const mapStateToProps = (state: State): IFoodProps => {
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

const FoodContainer: ComponentType<StyledComponentProps<FoodClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Food);
export { FoodContainer };
