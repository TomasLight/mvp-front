import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const PizzaSlice = (props: Props) => (
    <SvgIcon {...props} width="20px" height="22px" viewBox="0 0 20 22">
        <g clipPath="url(#clip0)">
            <path
                d="M6.20622 0.00651602C5.57497 -0.0582567 4.98747 0.365323 4.82614 1.03436L4.24763 3.43223C11.5765 3.66618 16.5343 8.99799 16.8445 16.9408L19.0687 16.2683C19.6828 16.0825 20.0644 15.4297 19.9914 14.7385C19.1758 7.03478 13.3121 0.738192 6.20622 0.00651602ZM3.92224 4.77924L0.0218466 20.9507C-0.00650802 21.0682 -0.00596107 21.1917 0.0234322 21.3089C0.0528256 21.4261 0.110026 21.5327 0.189262 21.6181C0.268499 21.7034 0.36697 21.7645 0.474741 21.7951C0.582512 21.8257 0.695773 21.8247 0.803097 21.7923L15.6078 17.3136C15.441 9.86092 10.8 4.86447 3.92224 4.78095V4.77924ZM5.00036 17.7274C4.75314 17.7274 4.51146 17.6474 4.3059 17.4976C4.10034 17.3477 3.94012 17.1348 3.84551 16.8856C3.7509 16.6364 3.72615 16.3622 3.77438 16.0977C3.82261 15.8332 3.94166 15.5902 4.11648 15.3995C4.29129 15.2088 4.51402 15.0789 4.7565 15.0263C4.99898 14.9737 5.25031 15.0007 5.47872 15.1039C5.70712 15.2071 5.90235 15.3819 6.0397 15.6062C6.17705 15.8304 6.25036 16.0941 6.25036 16.3638C6.25036 16.7254 6.11867 17.0723 5.88425 17.328C5.64982 17.5837 5.33188 17.7274 5.00036 17.7274ZM6.87536 11.2501C6.62814 11.2501 6.38646 11.1701 6.1809 11.0203C5.97534 10.8705 5.81512 10.6575 5.72051 10.4083C5.6259 10.1592 5.60115 9.88498 5.64938 9.62046C5.69761 9.35594 5.81666 9.11296 5.99148 8.92225C6.16629 8.73154 6.38902 8.60167 6.6315 8.54905C6.87398 8.49644 7.12531 8.52344 7.35372 8.62665C7.58212 8.72986 7.77735 8.90464 7.9147 9.12889C8.05205 9.35314 8.12536 9.61679 8.12536 9.88649C8.12536 10.2481 7.99367 10.595 7.75925 10.8507C7.52482 11.1065 7.20688 11.2501 6.87536 11.2501ZM10.9379 15.6819C10.6906 15.6819 10.449 15.602 10.2434 15.4521C10.0378 15.3023 9.87762 15.0893 9.78301 14.8401C9.6884 14.591 9.66365 14.3168 9.71188 14.0523C9.76011 13.7878 9.87916 13.5448 10.054 13.3541C10.2288 13.1634 10.4515 13.0335 10.694 12.9809C10.9365 12.9283 11.1878 12.9553 11.4162 13.0585C11.6446 13.1617 11.8398 13.3365 11.9772 13.5607C12.1146 13.785 12.1879 14.0486 12.1879 14.3183C12.1879 14.68 12.0562 15.0268 11.8217 15.2825C11.5873 15.5383 11.2694 15.6819 10.9379 15.6819Z"
                fill="black"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="20" height="22" fill="white"/>
            </clipPath>
        </defs>
    </SvgIcon>
);

const componentWithStyles = withStyles({
    root: {
        width: "auto",
    },
})(PizzaSlice);
export { componentWithStyles as PizzaSlice };
