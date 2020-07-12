import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";

import {
    AvocadoIcon,
    BurgerIcon,
    CartIcon,
    CoffeeIcon, FishIcon, ForkKnifeIcon, HotDogIcon, NoodlesIcon,
    PepperHotIcon,
    PizzaSliceIcon, SaladIcon, SushiIcon,
} from "@icons";
import { FavIconVariant } from "./FavIconVariant";

interface IFavIconProps {
    variant: FavIconVariant;
}

type Props = IFavIconProps & SvgIconProps;

const FavIcon = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case FavIconVariant.Avocado:
            return <AvocadoIcon {...rest}/>;

        case FavIconVariant.Burger:
            return <BurgerIcon {...rest}/>;

        case FavIconVariant.Cart:
            return <CartIcon {...rest}/>;

        case FavIconVariant.Coffee:
            return <CoffeeIcon {...rest}/>;

        case FavIconVariant.HotDog:
            return <HotDogIcon {...rest}/>;

        case FavIconVariant.Fish:
            return <FishIcon {...rest}/>;

        case FavIconVariant.ForkKnife:
            return <ForkKnifeIcon {...rest}/>;

        case FavIconVariant.Noodles:
            return <NoodlesIcon {...rest}/>;

        case FavIconVariant.PepperHot:
            return <PepperHotIcon {...rest}/>;

        case FavIconVariant.PizzaSlice:
            return <PizzaSliceIcon {...rest}/>;

        case FavIconVariant.Salad:
            return <SaladIcon {...rest}/>;

        case FavIconVariant.Sushi:
            return <SushiIcon {...rest}/>;

        default:
            return null;
    }
};

export { FavIcon };
