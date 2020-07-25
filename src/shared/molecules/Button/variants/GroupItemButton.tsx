import React from "react";
import { Button, ButtonClassKey, withStyles } from "@material-ui/core";

import { ButtonVariantProps } from "./ButtonVariantProps";

type Props = ButtonVariantProps;

const GroupItemButton = (props: Props) => {
    const { children, ...rest } = props;

    return (
        <Button
            {...rest}
            variant="contained"
            color="primary"
            size="small"
        >
            {children}
        </Button>
    );
};

const componentWithStyles = withStyles<ButtonClassKey>({
    root: {},
    label: {},
    text: {},
    textPrimary: {},
    textSecondary: {},
    outlined: {},
    outlinedPrimary: {},
    outlinedSecondary: {},
    contained: {},
    containedPrimary: {},
    containedSecondary: {},
    disableElevation: {},
    focusVisible: {},
    disabled: {},
    colorInherit: {},
    textSizeSmall: {},
    textSizeLarge: {},
    outlinedSizeSmall: {},
    outlinedSizeLarge: {},
    containedSizeSmall: {},
    containedSizeLarge: {},
    sizeSmall: {},
    sizeLarge: {},
    fullWidth: {},
    startIcon: {},
    endIcon: {},
    iconSizeSmall: {},
    iconSizeMedium: {},
    iconSizeLarge: {},
})(GroupItemButton);
export { componentWithStyles as GroupItemButton };
