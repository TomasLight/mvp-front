import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const Burger = (props: Props) => (
    <SvgIcon {...props} width="20px" height="20px" fill="none" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99998 3.66675C4.47688 3.66675 0 6.18451 0 9.28968H19.9999C19.9999 6.18451 15.523 3.66675 9.99998 3.66675ZM4.20777 10.6964H1.13341C0.50721 10.6964 0 11.1608 0 11.7348C0 12.3088 0.507171 12.7743 1.13341 12.7743H6.86644L4.20777 10.6964ZM19.9999 14.1797H11.3354L9.99994 15.2236L8.6639 14.1797H0V15.2181C0 15.7921 0.507171 16.2576 1.13341 16.2576H18.8665C19.4921 16.2576 19.9999 15.7921 19.9999 15.2181V14.1797H19.9999ZM15.7912 10.6964H18.8661C19.4917 10.6964 19.9995 11.1608 19.9995 11.7348C19.9995 12.3088 19.4917 12.7743 18.8661 12.7743H13.133L15.7912 10.6964ZM9.99983 14.1797L5.54366 10.6964H14.4559L9.99983 14.1797Z"
        />
    </SvgIcon>
);

const componentWithStyles = withStyles({
    root: {
        width: "auto",
    },
})(Burger);
export { componentWithStyles as Burger };
