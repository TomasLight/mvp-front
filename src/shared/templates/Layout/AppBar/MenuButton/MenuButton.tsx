import React, { FunctionComponent } from "react";

import { IconButton, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ChevronLeft, Menu } from "@material-ui/icons";

interface IMenuButtonProps {
    classes: Partial<ClassNameMap<MenuButtonClassKey>>;
    open: boolean;
}

interface IMenuButtonCallProps {
    toggle: () => void;
}

type Props = IMenuButtonProps & IMenuButtonCallProps;

const MenuButton: FunctionComponent<Props> = (props) => {
    const { classes, open, toggle } = props;

    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggle}
            className={classes.root}
        >
            {open
                ? (
                    <ChevronLeft/>
                )
                : (
                    <Menu/>
                )
            }
        </IconButton>
    );
};

type MenuButtonClassKey =
    | "root"
    ;

const componentWithStyles = withStyles<MenuButtonClassKey>((theme) => ({
    root: {
        padding: 6,
    },
}), { name: "MenuButton" })(MenuButton);
export { componentWithStyles as MenuButton };
