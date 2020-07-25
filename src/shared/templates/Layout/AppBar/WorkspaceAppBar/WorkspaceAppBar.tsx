import React from "react";

import { Toolbar, Typography, makeStyles } from "@material-ui/core";

import { AppBar } from "@shared/atoms/AppBar";

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

interface IWorkspaceAppBarProps {
    open: boolean;
    title: string;
}

interface IWorkspaceAppBarCallProps {
    toggle: () => void;
}

type Props = IWorkspaceAppBarProps & IWorkspaceAppBarCallProps;

const WorkspaceAppBar = (props: Props) => {
    const {
        open,
        title,
    } = props;

    const classes = useStyles();

    return (
        <AppBar open={open}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" noWrap className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export { WorkspaceAppBar, IWorkspaceAppBarProps, IWorkspaceAppBarCallProps };
