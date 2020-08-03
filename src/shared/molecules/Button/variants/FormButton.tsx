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
                variant="contained"
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
        backgroundColor: "#6FCF97",
        borderRadius: theme.borderRadius,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        padding: "12px 16px",

        "&:hover": {
            backgroundColor: "#7be4a7",
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
