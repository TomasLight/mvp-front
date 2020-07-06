import React from "react";

import { IconVariant } from "@enums";
import { IconSelectFieldOption } from "@select/types";
import { CoffeeIcon, PizzaSliceIcon, PepperHotIcon } from "@icons";

const renderFavicon = (option: IconSelectFieldOption): React.ReactElement => {
    const iconVariant: IconVariant = option.getValue();

    switch (iconVariant) {
        case IconVariant.Coffee:
            return (
                <CoffeeIcon/>
            );

        case IconVariant.PepperHot:
            return (
                <PepperHotIcon/>
            );

        case IconVariant.PizzaSlice:
            return (
                <PizzaSliceIcon/>
            );

        default:
            return null;
    }
};

export { renderFavicon };
