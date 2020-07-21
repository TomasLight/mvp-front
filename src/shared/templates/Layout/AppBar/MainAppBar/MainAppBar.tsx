import { Variant } from "@shared/templates";
import React from "react";

import { Toolbar, Typography, makeStyles } from "@material-ui/core";

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
        gridTemplateAreas: "'menu . title . name'",
        gridTemplateColumns: "36px 6px auto 1fr auto",
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
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.borderRadius,
        padding: "10px 8px",
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
    variant: Variant;
}

interface IMainAppBarCallProps {
    toggle: () => void;
}

type Props = IMainAppBarProps & IMainAppBarCallProps;

const MainAppBar = (props: Props) => {
    const {
        variant,
        open,
        title,
        name,
        toggle,
    } = props;

    const classes = useStyles();

    return (
        <AppBar open={open} className={classes.root} elevation={0}>
            <Toolbar className={classes.toolbar}>
                {variant === Variant.MainEdit && (
                    <MenuButton
                        open={open}
                        toggle={toggle}
                        classes={{ root: classes.menu }}
                    />
                )}

                {title && (
                    <Typography
                        variant="h6"
                        noWrap
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                )}

                <Typography
                    variant="body1"
                    noWrap
                    className={classes.name}
                >
                    {name}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export { MainAppBar };
