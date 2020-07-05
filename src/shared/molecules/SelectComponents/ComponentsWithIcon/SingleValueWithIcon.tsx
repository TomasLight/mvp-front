import clsx from "clsx";
import React, { FunctionComponent, ReactElement } from "react";
import { components, SingleValueProps } from "react-select";

import { makeStyles, Typography } from "@material-ui/core";
import { IFieldOption } from "../types";

const useStyles = makeStyles((theme) => ({
    singleValue: {
        display: "flex",
        alignItems: "center",

        marginLeft: 2,
        marginRight: 2,
        maxWidth: "calc(100% - 8px)",
        overflow: "hidden",
        position: "absolute",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        top: "50%",
        "-webkit-transform": "translateY(-50%)",
        "-ms-transform": "translateY(-50%)",
        transform: "translateY(-50%)",
        boxSizing: "border-box",

        color: theme.content.primary,
    },
    activeSingleValue: {
        color: theme.palette.primary.main,
    },
    disabledSingleValue: {
        color: theme.disabled.main,
    },
    iconWrapper: {
        padding: 12,
        "&:hover": {
            // background: theme.colors.default.outline.hover,
            borderRadius: "50%",
        },
    },
}));

export interface ISingleValueWithIconProps {
    selectProps: {
        icon?: ReactElement;
        renderIcon?: (option: IFieldOption) => ReactElement;
    };
}

type Props = SingleValueProps<IFieldOption> & ISingleValueWithIconProps;

const SingleValueWithIcon: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        data,
        ...rest
    } = props;

    const {
        selectProps: { active, icon, renderIcon },
        isDisabled,
    } = rest;

    const classes = useStyles();

    return (
        <components.SingleValue
            {...props}
            className={clsx(
                classes.singleValue,
                active ? classes.activeSingleValue : "",
                isDisabled ? classes.disabledSingleValue : ""
            )}
        >
            {
                icon
                    ? (
                        <span className={classes.iconWrapper}>
                            {icon}
                        </span>
                    )
                    : renderIcon(data)
            }
            <Typography
                // size={400}
                // color={
                //     isDisabled
                //         ? "disabled"
                //         : active ? "primary" : "medium"
                // }
                noWrap
            >
                {children}
            </Typography>
        </components.SingleValue>
    );
};

export { SingleValueWithIcon };
