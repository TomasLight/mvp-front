import clsx from "clsx";
import React, { FC } from "react";

import { AppBar as MuiAppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        gridArea: "app-bar",
        transition: theme.transitions.create([ "margin", "width" ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#FFF",
        color: "#000",
        justifySelf: "end",
    },
    appBarShift: {
        width: `calc(100% - ${theme.drawerWidth}px)`,
        marginLeft: theme.drawerWidth,
    },
}));

interface IAppBarProps {
    open: boolean;
    className?: string;
    elevation?: number;
}

type Props = IAppBarProps;

const AppBar: FC<Props> = (props) => {
    const {
        open,
        className,
        children,
        ...rest
    } = props;

    const classes = useStyles();

    return (
        <MuiAppBar
            position="relative"
            className={clsx(
                classes.appBar,
                {
                    [classes.appBarShift]: open,
                },
                className
            )}
            {...rest}
        >
            {children}
        </MuiAppBar>
    );
};

export { AppBar };
