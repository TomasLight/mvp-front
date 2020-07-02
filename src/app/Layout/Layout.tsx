import clsx from "clsx";
import React, { FunctionComponent } from "react";

import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight, Menu } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create([ "margin", "width" ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create([ "margin", "width" ], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

interface ILayoutProps {
    title?: string;
}

type Props = ILayoutProps;

const Layout: FunctionComponent<Props> = (props) => {
    const {
        title = "Кофейня Вкусник",
        children,
    } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [ open, setOpen ] = React.useState(false);

    const toggle = () => setOpen((isOpen) => !isOpen);

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
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
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    {[ "Каталог", "Контент", "Настройки" ].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                {children}
            </main>
        </div>
    );
};

export { Layout };
