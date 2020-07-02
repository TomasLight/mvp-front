import clsx from "clsx";
import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { AppBarContainer } from "./AppBar";
import { DrawerContainer } from "./Drawer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'drawer app-bar' 'content content'",
        minHeight: "100%",
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
    },
    contentShift: {
        marginLeft: theme.drawerWidth,
    },
}));

interface ILayoutProps {
}

type Props = ILayoutProps;

const Layout: FunctionComponent<Props> = (props) => {
    const {
        children,
    } = props;

    const classes = useStyles();
    const [ open, setOpen ] = React.useState(false);

    const toggle = () => setOpen((isOpen) => !isOpen);

    return (
        <div className={classes.root}>
            <AppBarContainer
                open={open}
                toggle={toggle}
            />

            <DrawerContainer open={open} />

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

export { Layout };
