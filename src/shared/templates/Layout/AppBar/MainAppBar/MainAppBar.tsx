import React, { FC } from "react";

import { IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Lock } from "@material-ui/icons";

import { AppBar } from "@shared/atoms/AppBar";
import { MenuButton } from "../MenuButton";

const useStyles = makeStyles((theme) => ({
    root: {
        borderBottomColor: "#BDBDBD",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
    },
    toolbar: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateAreas: "'menu . title . name . lock'",
        gridTemplateColumns: "36px 6px auto 1fr auto 20px 20px",
        paddingLeft: 22,
        paddingRight: 22,
    },
    menu: {
        gridArea: "menu",
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.borderRadius,
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: "21px",
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.borderRadius,
        padding: "7px 8px",
    },
    name: {
        gridArea: "name",
        fontSize: 14,
        lineHeight: "16px",
    },
    lock: {
        gridArea: "lock",
        padding: 0,
    },
}));

interface IMainAppBarProps {
    open: boolean;
    title: string;
    name: string;
}

interface IMainAppBarCallProps {
    toggle: () => void;
}

type Props = IMainAppBarProps & IMainAppBarCallProps;

const MainAppBar: FC<Props> = (props) => {
    const {
        open,
        title,
        name,
        toggle,
    } = props;

    const classes = useStyles();

    return (
        <AppBar open={open} className={classes.root} elevation={0}>
            <Toolbar className={classes.toolbar}>
                <MenuButton
                    open={open}
                    toggle={toggle}
                    classes={{ root: classes.menu }}
                />

                <Typography
                    variant="h6"
                    noWrap
                    className={classes.title}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    noWrap
                    className={classes.name}
                >
                    {name}
                </Typography>

                <IconButton
                    color="inherit"
                    className={classes.lock}
                >
                    <Lock/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export { MainAppBar };
