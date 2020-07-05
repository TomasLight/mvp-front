import React, { FunctionComponent } from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const Cart: FunctionComponent<Props> = (props: Props) => (
    <SvgIcon {...props} width="20px" height="22px" viewBox="0 0 20 22">
        <path
            d="M18.0041 12.4541L19.6157 5.36321C19.732 4.85124 19.3429 4.3637 18.8178 4.3637H5.42755L5.11507 2.83609C5.03721 2.45533 4.70216 2.18188 4.31349 2.18188H0.818182C0.366307 2.18188 0 2.54819 0 3.00007V3.54552C0 3.9974 0.366307 4.3637 0.818182 4.3637H3.20056L5.59538 16.0717C5.02244 16.4012 4.63636 17.019 4.63636 17.7273C4.63636 18.7817 5.49109 19.6364 6.54546 19.6364C7.59982 19.6364 8.45455 18.7817 8.45455 17.7273C8.45455 17.193 8.23476 16.7102 7.881 16.3637H15.0281C14.6743 16.7102 14.4545 17.193 14.4545 17.7273C14.4545 18.7817 15.3093 19.6364 16.3636 19.6364C17.418 19.6364 18.2727 18.7817 18.2727 17.7273C18.2727 16.9715 17.8334 16.3183 17.1962 16.009L17.3843 15.1814C17.5006 14.6694 17.1115 14.1819 16.5864 14.1819H7.43581L7.21268 13.091H17.2063C17.5883 13.091 17.9194 12.8266 18.0041 12.4541Z"
        />
    </SvgIcon>
);

const componentWIthStyles = withStyles({
    root: {
        width: "auto",
    },
})(Cart);
export { componentWIthStyles as Cart };
