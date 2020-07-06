import clsx from "clsx";
import React, { FC } from "react";

import {
    createStyles,
    StyledComponentProps,
    Typography,
    withStyles,
} from "@material-ui/core";

type FieldErrorClassKey =
    | "root"
    | "error"
    | "help"
    ;

const styles = (theme) => createStyles<FieldErrorClassKey, IFieldErrorProps>({
    root: {
        display: "block",
        width: "100%",
        boxSizing: "border-box",

        fontSize: 14,
        lineHeight: "20px",
    },
    error: {
        color: "#D44333",
    },
    help: {
        color: "#757575",
    },
});

interface IFieldErrorProps {
    id?: string;
    error: boolean;
    text: string;
}

type Props = IFieldErrorProps & StyledComponentProps<FieldErrorClassKey>;

const FieldError: FC<Props> = (props) => {
    const {
        classes,
        error,
        text,
        ...rest
    } = props;

    const show = Boolean(text || error);

    if (!show) {
        return null;
    }

    return (
        <Typography
            className={clsx(classes.root, {
                [classes.error]: error,
                [classes.help]: !error,
            })}
            {...rest}
        >
            {text}
        </Typography>
    );
};

const componentWithStyles = withStyles<FieldErrorClassKey>(
    styles,
    { name: "FieldError" }
)(FieldError);
export {
    componentWithStyles as FieldError,
    IFieldErrorProps,
    FieldErrorClassKey,
};
