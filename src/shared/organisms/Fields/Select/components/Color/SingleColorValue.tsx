import clsx from "clsx";
import React, { ReactElement } from "react";
import { components, SingleValueProps } from "react-select";

import { makeStyles } from "@material-ui/core";
import { ColorSelectFieldOption } from "../../types";

type StyleProps = {
    color: string;
};

const useStyles = makeStyles((theme) => ({
    color: {
        borderRadius: 6,
        marginRight: 12,
        height: "100%",
        width: "100%",
        backgroundColor: (props: StyleProps) => props.color ? props.color : "transparent",
    },
    activeSingleValue: {
        color: theme.palette.primary.main,
    },
    disabledSingleValue: {
        color: theme.disabled.main,
    },
}), { name: "SingleColorValue" });

type Props = SingleValueProps<ColorSelectFieldOption>;

const SingleColorValue = (props: Props) => {
    const { data, children, ...rest } = props;
    const {
        selectProps: { active },
        isDisabled,
    } = rest;

    const classes = useStyles({ color: data.color });

    return (
        <div
            className={clsx(classes.color, {
                [classes.activeSingleValue]: active,
                [classes.disabledSingleValue]: isDisabled,
            })}
        >
            {children}
        </div>
    );

    return (
        <components.SingleValue
            {...props}
            className={clsx({
                [classes.activeSingleValue]: active,
                [classes.disabledSingleValue]: isDisabled,
            })}
        >
            <div className={classes.color}>
                {children}
            </div>
        </components.SingleValue>
    );
};

export { SingleColorValue };
