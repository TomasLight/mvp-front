import React from "react";
import {
    Button,
    ButtonClassKey,
    makeStyles,
    withStyles,
    CircularProgress,
} from "@material-ui/core";

import { ButtonVariantProps } from "./ButtonVariantProps";

const useStyles = makeStyles({
    wrapper: {
        position: "relative",
    },
    progress: {
        color: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -18,
        marginLeft: -18,
    },
});

type Props = ButtonVariantProps;

const FormButton = (props: Props) => {
    const { children, state = {}, ...rest } = props;
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button
                {...rest}
                disabled={state.loading || state.disabled || state.pristine}
                variant={"contained"}
                color={state.alternative ? "default" : "primary"}
            >
                {children}
            </Button>
            {state.loading && (
                <CircularProgress size={36} thickness={4} className={classes.progress}/>
            )}
        </div>
    );
};

const componentWithStyles = withStyles<ButtonClassKey>(theme => ({
    root: {
        borderRadius: theme.borderRadius,
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        padding: "12px 16px",

        backgroundColor: "#E0E0E0",
        color: "rgba(0, 0, 0, 0.87)",
        "&:hover": {
            backgroundColor: "#d5d5d5",
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
    containedPrimary: {
        backgroundColor: "#6FCF97",
        color: "#FFF",
        "&:hover": {
            backgroundColor: "#7be4a7",
        },
    },
    containedSecondary: {},
    disableElevation: {},
    focusVisible: {},
    disabled: {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        color: "rgba(0, 0, 0, 0.26)",
        boxShadow: "none",
        cursor: "initial",
    },
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
}))(FormButton);
export { componentWithStyles as FormButton };
