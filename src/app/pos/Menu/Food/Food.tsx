import React, { FunctionComponent } from "react";

import { withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import { Cart, Dish } from "../models";
import { FoodItem, IFoodItemCallProps } from "./FoodItem";

interface IFoodProps {
    classes: Partial<ClassNameMap<FoodClassKey>>;
    dishes: Dish[];
    cart: Cart;
}

interface IFoodCallProps extends IFoodItemCallProps {
}

type Props = IFoodProps & IFoodCallProps;

const Food: FunctionComponent<Props> = (props) => {
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
export { componentWithStyles as Food, FoodClassKey, IFoodProps, IFoodCallProps };
