import React from "react";
import { Button, ButtonClassKey, withStyles } from "@material-ui/core";

import { ButtonVariantProps } from "./ButtonVariantProps";

type Props = ButtonVariantProps;

const FilterButton = (props: Props) => {
    const { children, state = {}, ...rest } = props;

    return (
        <Button
            {...rest}
            variant={state.active ? "contained" : "text"}
            color="secondary"
        >
            {children}
        </Button>
    );
};

const componentWithStyles = withStyles<ButtonClassKey>({
    root: {
        borderRadius: 36,
        padding: "6px 12px",
    },
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
})(FilterButton);
export { componentWithStyles as FilterButton };
