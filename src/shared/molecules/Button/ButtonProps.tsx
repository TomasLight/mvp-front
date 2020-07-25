import React, { SyntheticEvent } from "react";
import { ButtonProps as MuiButtonProps } from "@material-ui/core";

import { ButtonState } from "./ButtonState";
import { ButtonVariant } from "./ButtonVariant";

interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
    variant: ButtonVariant;
    state?: ButtonState;
    data?: any;
    onClick?: (event: SyntheticEvent | any) => void;
}

export { ButtonProps };
