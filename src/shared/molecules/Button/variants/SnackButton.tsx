import React from "react";
import { IconButton, IconButtonProps, IconButtonClassKey, withStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

type Props = Omit<IconButtonProps, "size">;

const SnackDismissButton = (props: Props) => {
    const { children, ...rest } = props;

    return (
        <IconButton {...rest}>
            <Close/>
        </IconButton>
    );
};

const componentWithStyles = withStyles<IconButtonClassKey>(theme => ({
    root: {
        color: "#fff",
        padding: 6,
    },
    edgeStart: {},
    edgeEnd: {},
    colorInherit: {},
    colorPrimary: {},
    colorSecondary: {},
    disabled: {},
    sizeSmall: {},
    label: {},
}))(SnackDismissButton);
export { componentWithStyles as SnackDismissButton };
