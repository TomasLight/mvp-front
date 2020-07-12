import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const ArrowLeft = (props: Props) => (
    <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20">
        <path
            d="M11.772 16.9283L10.9297 17.7417C10.573 18.0861 9.99632 18.0861 9.64345 17.7417L2.26749 10.6229C1.91084 10.2785 1.91084 9.72155 2.26749 9.38081L9.64345 2.2583C10.0001 1.9139 10.5768 1.9139 10.9297 2.2583L11.772 3.07167C12.1325 3.41974 12.1249 3.98763 11.7568 4.32837L7.1848 8.53446H18.0894C18.594 8.53446 19 8.9265 19 9.41379V10.5862C19 11.0735 18.594 11.4655 18.0894 11.4655H7.1848L11.7568 15.6716C12.1287 16.0124 12.1363 16.5803 11.772 16.9283Z"
        />
    </SvgIcon>
);

const componentWithStyles = withStyles({
    root: {
        width: "auto",
    },
})(ArrowLeft);
export { componentWithStyles as ArrowLeft };
