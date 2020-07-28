import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { Cart, Dish } from "../models";
import { FoodItem, IFoodItemCallProps } from "./FoodItem";

interface IFoodProps {
    dishes: Dish[];
    cart: Cart;
}

type Props = IFoodProps & IFoodItemCallProps & StyledComponentProps<FoodClassKey>;

const Food = (props: Props) => {
    const {
        classes,
        dishes,
        cart,
        openDish,
        addToCart,
        increaseAmount,
        decreaseAmount,
    } = props;

    return (
        <div className={classes.root}>
            {dishes.map((dish: Dish) => (
                <FoodItem
                    key={`dish-${dish.id}`}
                    dish={dish}
                    openDish={openDish}
                    addToCart={addToCart}
                    amounts={cart.getAmounts(dish.id)}
                    increaseAmount={increaseAmount}
                    decreaseAmount={decreaseAmount}
                />
            ))}
        </div>
    );
};

type FoodClassKey =
    | "root"
    ;

const componentWithStyles = withStyles<FoodClassKey>({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gridGap: 20,
    },
}, { name: "Food" })(Food);
export { componentWithStyles as Food, FoodClassKey, IFoodProps, IFoodItemCallProps as IFoodCallProps };
