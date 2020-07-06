import React, { FC } from "react";

import { IconButton, StyledComponentProps, withStyles } from "@material-ui/core";
import { ChevronLeft, Menu } from "@material-ui/icons";

interface IMenuButtonProps {
    open: boolean;
}

interface IMenuButtonCallProps {
    toggle: () => void;
}

type Props = IMenuButtonProps & IMenuButtonCallProps & StyledComponentProps<MenuButtonClassKey>;

const MenuButton: FC<Props> = (props) => {
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
