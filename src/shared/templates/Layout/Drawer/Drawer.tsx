import React from "react";

import { Drawer as MuiDrawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SideBarItem } from "../models";

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

interface IDrawerProps {
    open: boolean;
    menuItems: SideBarItem[];
}

interface IDrawerCallProps {
    redirect: (url: string) => void;
}

type Props = IDrawerProps & IDrawerCallProps;

const Drawer = (props: Props) => {
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

export { Drawer, IDrawerProps };
