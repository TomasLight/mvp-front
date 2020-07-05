import React, { FunctionComponent } from "react";

import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppBar } from "@shared/atoms/AppBar";
import { MenuButton } from "../MenuButton";

const useStyles = makeStyles({
    toolbar: {
        display: "grid",
        gridAutoFlow: "columns",
        gridTemplateAreas: "'menu . title'",
        gridTemplateColumns: "36px 6px 1fr",
        paddingLeft: 50,
        paddingRight: 50,
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: "21px",
    },
}, { name: "PosAppBar" });

interface IPosAppBarProps {
    open: boolean;
    title: string;
}

interface IPosAppBarCallProps {
    toggle: () => void;
}

type Props = IPosAppBarProps & IPosAppBarCallProps;

const PosAppBar: FunctionComponent<Props> = (props) => {
    const {
        open,
        title,
        toggle,
    } = props;

    const classes = useStyles();

    return (
        <AppBar open={open}>
            <Toolbar className={classes.toolbar}>
                <MenuButton open={open} toggle={toggle} />

                <Typography variant="h6" noWrap className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export { PosAppBar, IPosAppBarProps, IPosAppBarCallProps };
