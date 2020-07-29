import React, { useMemo } from "react";
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
        ...rest
    } = props;

    const amounts = useMemo(() => {
        const map = new Map<string, Map<number, number>>();
        dishes.forEach((dish: Dish) => {
            const dishAmounts = cart.getAmounts(dish.id);
            map.set(dish.id, dishAmounts);
        });

        return map;
    }, [cart, dishes]);

    return (
        <div className={classes.root}>
            {dishes.map((dish: Dish) => (
                <FoodItem
                    key={`dish-${dish.id}`}
                    dish={dish}
                    amounts={amounts.get(dish.id)}
                    {...rest}
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

export {
    componentWithStyles as Food,
    FoodClassKey,
    IFoodProps,
    IFoodItemCallProps as IFoodCallProps
};
