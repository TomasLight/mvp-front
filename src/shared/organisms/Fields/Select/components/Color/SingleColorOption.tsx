import clsx from "clsx";
import React, { FC } from "react";
import { components, OptionProps } from "react-select";

import { makeStyles, MenuItem, Tooltip } from "@material-ui/core";
import { ColorSelectFieldOption } from "../../types";

type StyleProps = {
    color: string;
};

const useStyles = makeStyles((theme) => ({
    option: {
    },
    tooltip: {
        fontSize: "0.8rem",
    },
    menuItem: {
        height: "100%",
        padding: "3px 6px",

        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.20)",
        },
    },
    firstItem: {
        paddingTop: 6,
    },
    lastItem: {
        paddingBottom: 6,
    },
    color: {
        borderRadius: 6,
        height: "100%",
        width: "100%",
        backgroundColor: (props: StyleProps) => props.color ? props.color : "transparent",
    },
}), { name: "SingleColorOption" });

type Props = OptionProps<ColorSelectFieldOption>;

const SingleColorOption: FC<Props> = (props) => {
    const { children, options, data } = props;

    const classes = useStyles({ color: data.color });

    const index = options.indexOf(data);

    return (
        <components.Option {...props}>
            <Tooltip title={children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
                <MenuItem
                    disableGutters
                    className={clsx(classes.menuItem, {
                        [classes.firstItem]: index === 0,
                        [classes.lastItem]: index === options.length - 1,
                    })}
                >
                    <div className={classes.color}>
                        {children}
                    </div>
                </MenuItem>
            </Tooltip>
        </components.Option>
    );
};

export { SingleColorOption };
