import React, { FC, ReactElement } from "react";
import { components, OptionProps } from "react-select";

import { makeStyles, MenuItem, Tooltip, Typography } from "@material-ui/core";
import { IFieldOption } from "../../types";

const useStyles = makeStyles((theme) => ({
    tooltip: {
        fontSize: "0.8rem",
    },
    option: {
        height: "100%",
    },
    iconWrapper: {
        padding: 12,
        "&:hover": {
            borderRadius: "50%",
        },
    },
}));

export interface ISingleOptionWithIconProps {
    selectProps: {
        icon?: ReactElement;
        renderIcon?: (option: IFieldOption) => ReactElement;
    };
}

type Props = OptionProps<IFieldOption> & ISingleOptionWithIconProps;

const SingleOptionWithIcon: FC<Props> = (props) => {
    const {
        children,
        data,
        selectProps: { icon, renderIcon },
    } = props;

    const classes = useStyles();

    return (
        <components.Option {...props}>
            <Tooltip title={children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
                <MenuItem className={classes.option}>
                    {
                        icon
                            ? (
                                <span className={classes.iconWrapper}>
                                    {icon}
                                </span>
                            )
                            : renderIcon(data)
                    }
                    <Typography noWrap>
                        {children}
                    </Typography>
                </MenuItem>
            </Tooltip>
        </components.Option>
    );
};

export { SingleOptionWithIcon };
