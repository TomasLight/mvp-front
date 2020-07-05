import { SideBarItem } from "@shared/templates/Layout/models";
import clsx from "clsx";
import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";
import { Variant } from "./variant";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: "grid",
        gridTemplateAreas: "'drawer app-bar' 'content content'",
        height: "100%",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "0 1fr",
    },
    content: {
        gridArea: "content",
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        overflowY: "auto",
    },
    contentShift: {
        marginLeft: theme.drawerWidth,
    },
}));

interface ILayoutProps {
    title: string;
    name: string;
    menuItems: SideBarItem[];
    variant: Variant;
}

interface ILayoutCallProps {
    redirect: (url: string) => void;
}

type Props = ILayoutProps & ILayoutCallProps;

const Layout: FunctionComponent<Props> = (props) => {
    const {
        title,
        name,
        menuItems,
        variant,
        redirect,
        children,
    } = props;

    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);

    const toggle = () => setOpen((isOpen) => !isOpen);

    return (
        <div className={classes.root}>
            <AppBar
                variant={variant}
                title={title}
                name={name}
                open={open}
                toggle={toggle}
            />

            <Drawer
                menuItems={menuItems}
                redirect={redirect}
                open={open}
            />

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    );
};

export { Layout, ILayoutProps, ILayoutCallProps };
