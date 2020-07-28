import { ComponentType } from "react";
import { connect } from "react-redux";
import { StyledComponentProps } from "@material-ui/core";

import { State } from "@AdminState";
import { Category, Dish } from "@ws/Menu/models";
import { Food, FoodClassKey, IFoodCallProps, IFoodProps } from "@ws/Menu/Food";

let storedDishes: Dish[];
let storedCategory: Category;
let dishesForCategory: Dish[];

function getDishes(dishes: Dish[], selectedCategory: Category) {
    let flag = true;
    if (storedDishes != dishes) {
        storedDishes = dishes;
        flag = false;
    }
    if (storedCategory != selectedCategory) {
        storedCategory = selectedCategory;
        flag = false;
    }

    if (flag) {
        return dishesForCategory;
    }

    let _dishes = [];
    if (selectedCategory) {
        _dishes = dishes.filter(
            dish => selectedCategory.contains(dish.id)
        );
    }
    dishesForCategory = Dish.sort(_dishes);
    return dishesForCategory;
}

const mapStateToProps = (state: State): IFoodProps => {
    const { fakeMenu } = state.content;
    return {
        dishes: getDishes(fakeMenu.dishes, fakeMenu.selectedCategory),
        cart: fakeMenu.cart,
    };
};

const emptyCallback = () => undefined;
const mapDispatchToProps = (): IFoodCallProps => ({
    openDish: emptyCallback,
    addToCart: emptyCallback,
    increaseAmount: emptyCallback,
    decreaseAmount: emptyCallback,
});

const FoodContainer: ComponentType<StyledComponentProps<FoodClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Food);
export { FoodContainer };
