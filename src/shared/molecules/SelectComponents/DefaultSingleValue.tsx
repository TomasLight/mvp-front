import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { SingleValueProps } from "react-select";

import { makeStyles, Typography } from "@material-ui/core";

import { IFieldOption } from "./types";

const useStyles = makeStyles({
    singleValue: {
        marginLeft: 2,
        marginRight: 2,
    },
    noValueWrap: {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

type Props = SingleValueProps<IFieldOption>;

const DefaultSingleValue: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        selectProps,
    } = props;

    const classes = useStyles();
    let valueClass = classes.singleValue;

    if (selectProps.noValueWrap) {
        valueClass = clsx(classes.noValueWrap, valueClass);
    }

    return (
        <Typography
            className={valueClass}
            // color={selectProps.isDisabled
            //     ? "disabled"
            //     : selectProps.isFocused
            //         ? "primary"
            //         : "medium"
            // }
        >
            {children}
        </Typography>
    );
};

export { DefaultSingleValue };
