import React from "react";

import { Drawer as MuiDrawer, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";

import { SideBarItem } from "../../models";

const useStyles = makeStyles((theme) => ({
    drawer: {
        gridArea: "drawer",
        width: theme.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
}));

interface IWorkspaceDrawerProps {
    open: boolean;
    menuItems: SideBarItem[];
}

interface IWorkspaceDrawerCallProps {
    redirect: (url: string) => void;
}

type Props = IWorkspaceDrawerProps & IWorkspaceDrawerCallProps;

const AdminDrawer = (props: Props) => {
    const { open, menuItems, redirect } = props;

    const classes = useStyles();
    const handleRedirect = (url: string) => () => {
        redirect(url);
    };

    return (
        <MuiDrawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                root: classes.drawer,
                paper: classes.drawerPaper,
            }}
        >
            <List>
                {menuItems.map((item: SideBarItem) => (
                    <ListItem button key={item.title} onClick={handleRedirect(item.url)}>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
        </MuiDrawer>
    );
};

export { AdminDrawer, IWorkspaceDrawerProps };
