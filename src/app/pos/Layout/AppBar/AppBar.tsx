import clsx from "clsx";
import React, { FunctionComponent } from "react";

import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight, Menu } from "@material-ui/icons";

// const drawerWidth = 240;

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
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

interface IAppBarProps {
    open: boolean;
    title: string;
}

interface IAppBarCallProps {
    toggle: () => void;
}

type Props = IAppBarProps & IAppBarCallProps;

const AppBar: FunctionComponent<Props> = (props) => {
    const {
        open,
        title,
        toggle,
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    return (
        <MuiAppBar
            position="relative"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggle}
                    edge="start"
                    className={classes.menuButton}
                >
                    {open
                        ? (
                            theme.direction === "ltr" ? <ChevronLeft/> : <ChevronRight/>
                        )
                        : (
                            <Menu/>
                        )
                    }
                </IconButton>

                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
            </Toolbar>
        </MuiAppBar>
    );
};

export { AppBar, IAppBarProps, IAppBarCallProps, Props as AppBarProps };
