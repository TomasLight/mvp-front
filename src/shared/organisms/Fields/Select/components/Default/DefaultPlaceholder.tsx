import clsx from "clsx";
import React, { FC } from "react";
import { components } from "react-select";
import { PlaceholderProps } from "react-select/src/components/Placeholder";

import { makeStyles, Typography } from "@material-ui/core";
import { SelectFieldOption } from "../../types";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.content.primary,
    },
    error: {
        color: theme.palette.error.main,
    },
}));

type Props = PlaceholderProps<SelectFieldOption>;

const DefaultPlaceholder: FC<Props> = (props) => {
    const {
        children,
        selectProps: { error, required },
    } = props;

    const classes = useStyles();

    return (
        <components.Placeholder {...props}>
            <Typography className={clsx(classes.root, error ? classes.error : "")}>
                {children}
                {required ? (
                    <span> *</span>
                ) : ""}
            </Typography>
        </components.Placeholder>
    );
};

export { DefaultPlaceholder };
