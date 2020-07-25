import React from "react";

import { Variant } from "../variant";
import { SideBarItem } from "../models";
import { AdminDrawer } from "./AdminDrawer";

interface IDrawerProps {
    open: boolean;
    menuItems: SideBarItem[];
    variant: Variant;
}

interface IDrawerCallProps {
    redirect: (url: string) => void;
}

type Props = IDrawerProps & IDrawerCallProps;

const Drawer = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case Variant.AdminNew:
            return null;

        case Variant.AdminEdit:
            return (
                <AdminDrawer {...rest}/>
            );

        case Variant.Workspace:
            return null;

        default:
            throw new Error(`Invalid variant(${variant}) for ${nameof(Drawer)}`);
    }
};

export { Drawer, IDrawerProps };
