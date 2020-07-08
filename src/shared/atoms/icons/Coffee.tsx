import React, { FC } from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const Coffee: FC<Props> = (props) => (
    <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20">
        <path
            d="M6.4011 14H11.8006C13.2911 14 14.5004 12.6562 14.5004 11H15.4003C17.3858 11 19 9.20625 19 7C19 4.79375 17.3858 3 15.4003 3H4.37628C4.00225 3 3.70134 3.33437 3.70134 3.75V11C3.70134 12.6562 4.91061 14 6.4011 14ZM15.4003 5C16.393 5 17.2002 5.89688 17.2002 7C17.2002 8.10313 16.393 9 15.4003 9H14.5004V5H15.4003ZM16.7418 17H2.35989C1.02126 17 0.644416 15 1.34748 15H17.7514C18.4544 15 18.0832 17 16.7418 17Z"
        />
    </SvgIcon>
);

const componentWIthStyles = withStyles({
    root: {
        width: "auto",
    },
})(Coffee);
export { componentWIthStyles as Coffee };
