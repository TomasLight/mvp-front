import clsx from "clsx";
import React from "react";
import { Button, ButtonClassKey, StyledComponentProps, withStyles } from "@material-ui/core";

import { ButtonVariantProps } from "./ButtonVariantProps";

type ClassKey = ButtonClassKey | "active";

type Props = ButtonVariantProps & StyledComponentProps<ClassKey>;

const SizeButton = (props: Props) => {
    const { classes, children, state = {}, ...rest } = props;

    return (
        <Button
            {...rest}
            size="medium"
            classes={classes}
            className={clsx({
                [classes.active]: state.active,
            })}
        >
            {children}
        </Button>
    );
};

const componentWithStyles = withStyles<ClassKey>(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[0],
        color: "#000",
        borderRadius: 0,

        "&:last-of-type": {
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
        },
        "&:first-of-type": {
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
        },
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
    active: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 8px 36px rgba(0, 0, 0, 0.17)",
        borderRadius: theme.borderRadius,
        zIndex: 1,
        marginLeft: -1, // hack to hide a divider from left sid of button

        "&:hover": {
            backgroundColor: "#f8f8f8",
        },

        "& + $divider": {
            visibility: "hidden",
        },
    },
}))(SizeButton);
export { componentWithStyles as SizeButton };
