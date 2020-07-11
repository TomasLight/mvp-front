import React from "react";

import { Variant } from "../variant";
import { SideBarItem } from "../models";
import { WorkspaceDrawer } from "./WorkspaceDrawer";

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
        case Variant.Main:
            return null;

        case Variant.Pos:
            return (
                <WorkspaceDrawer {...rest}/>
            );

        default:
            throw new Error(`Invalid variant(${variant}) for ${nameof(Drawer)}`);
    }
};

export { Drawer, IDrawerProps };
