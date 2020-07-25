import React from "react";
import { Button, ButtonProps, ButtonClassKey, withStyles } from "@material-ui/core";

type Props = Omit<ButtonProps, "variant">;

const SnackButton = (props: Props) => {
    const { children, ...rest } = props;

    return (
        <Button
            {...rest}
            variant="contained"
        >
            {children}
        </Button>
    );
};

const componentWithStyles = withStyles<ButtonClassKey>(theme => ({
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
}))(SnackButton);
export { componentWithStyles as SnackButton };
