import React, { FunctionComponent } from "react";

import { withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import { CartItem, Dish } from "../models";
import { FoodItem } from "./FoodItem";

interface IFoodProps {
    classes: Partial<ClassNameMap<FoodClassKey>>;
    dishes: Dish[];
}

interface IFoodCallProps {
    openDish: (dishId: number) => void;
    addToCart: (cartItem: CartItem) => void;
}

type Props = IFoodProps & IFoodCallProps;

const Food: FunctionComponent<Props> = (props) => {
    const { classes, dishes, openDish, addToCart } = props;

    return (
        <div className={classes.root}>
            {dishes.map((dish: Dish) => (
                <FoodItem
                    key={`dish-${dish.id}`}
                    dish={dish}
                    openDish={openDish}
                    addToCart={addToCart}
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
