import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const Phone = (props: Props) => (
    <SvgIcon {...props} width="20px" height="20px" viewBox="0 0 20 20">
        <path
            d="M17.9006 1.86521L14.5491 1.02147C14.1849 0.930069 13.8111 1.13749 13.6629 1.51014L12.116 5.44755C11.9807 5.79208 12.0709 6.19636 12.3384 6.43191L14.2913 8.17562C13.1312 10.872 11.1041 13.115 8.58086 14.4052L6.98246 12.2748C6.76332 11.983 6.39595 11.8845 6.08013 12.0322L2.47083 13.7196C2.12602 13.8849 1.93588 14.2927 2.01967 14.6899L2.79309 18.3461C2.87366 18.7258 3.18303 19 3.54718 19C11.8002 19 18.5 11.7052 18.5 2.68784C18.5 2.2941 18.2518 1.95309 17.9006 1.86521Z"
            // fill="black"
        />
    </SvgIcon>
);

const componentWithStyles = withStyles({
    root: {
        width: "auto",
    },
})(Phone);
export { componentWithStyles as Phone };
