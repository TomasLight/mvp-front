import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { SizeType } from "@enums/SizeType";
import { State } from "@State";
import { Translate } from "@utils/translates";

import { CartItem, Dish } from "../models";
import { Food, IFoodCallProps, IFoodProps } from "./Food";

const mapStateToProps = (state: State): Partial<IFoodProps> => {
    const array = [
        {
            title: Translate.getString("Капучино"),
            image: "/images/coffee_001.png",
        },
        {
            title: Translate.getString("Американо"),
            image: "/images/coffee_002.png",
        },
        {
            title: Translate.getString("Латте"),
            image: "/images/coffee_003.png",
        },
        {
            title: Translate.getString("Макиато"),
            image: "/images/coffee_004.png",
        },
        {
            title: Translate.getString("Лунго"),
            image: "/images/coffee_005.png",
        },
        {
            title: Translate.getString("Раф"),
            image: "/images/coffee_006.png",
        },
    ];

    const dishes: Dish[] = [];
    array.forEach((item, index) => {
        const dish = new Dish({
            id: index + 1,
            title: item.title,
            image: item.image,
            cost: 250,
            sizes: [ 250, 330, 460 ],
            sizeType: SizeType.Milliliter,
        });
        dishes.push(dish);
    });

    return { dishes };
};

const mapDispatchToProps = (dispatch: Dispatch): IFoodCallProps => ({
    openDish: (dishId: number) => undefined,
    addToCart: (cartItem: CartItem) => undefined,
});

const FoodContainer: ComponentType<Partial<IFoodProps>> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Food);
export { FoodContainer };
