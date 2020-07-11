import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";

import { Enum, IconVariant } from "@enums";
import { CoffeeIcon, PepperHotIcon, PizzaSliceIcon } from "./index";

const FavIconVariant = Object.freeze({
    Coffee: IconVariant.Coffee,
    PizzaSlice: IconVariant.PizzaSlice,
    PepperHot: IconVariant.PepperHot,
});

type FavIconVariant = Enum<typeof FavIconVariant>;

interface IFavIconProps {
    variant: FavIconVariant;
}

type Props = IFavIconProps & SvgIconProps;

const FavIcon = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case FavIconVariant.Coffee:
            return <CoffeeIcon {...rest}/>;

        case FavIconVariant.PepperHot:
            return <PepperHotIcon {...rest}/>;

        case FavIconVariant.PizzaSlice:
            return <PizzaSliceIcon {...rest}/>;

        default:
            return null;
    }
};

export { FavIcon, FavIconVariant };
