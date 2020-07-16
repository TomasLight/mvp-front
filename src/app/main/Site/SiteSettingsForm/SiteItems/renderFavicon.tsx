import React from "react";

import { IconSelectFieldOption } from "@select/types";
import { FavIcon } from "@icons";
import { FavIconVariant } from "@shared/molecules";

const renderFavicon = (option: IconSelectFieldOption): React.ReactElement => {
    const iconVariant: FavIconVariant = option.getValue();
    return (
        <FavIcon variant={iconVariant}/>
    );
};

export { renderFavicon };
