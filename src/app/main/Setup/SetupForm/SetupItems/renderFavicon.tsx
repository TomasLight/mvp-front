import React from "react";

import { IconSelectFieldOption } from "@select/types";
import { FavIcon, FavIconVariant } from "@icons";

const renderFavicon = (option: IconSelectFieldOption): React.ReactElement => {
    const iconVariant: FavIconVariant = option.getValue();
    return (
        <FavIcon variant={iconVariant}/>
    );
};

export { renderFavicon };
