import React from "react";

import { Variant } from "../variant";
import { MainAppBar } from "./MainAppBar";
import { WorkspaceAppBar } from "./WorkspaceAppBar";

interface IAppBarProps {
    open: boolean;
    title: string;
    name: string;
    variant: Variant;
}

interface IAppBarCallProps {
    toggle: () => void;
}

type Props = IAppBarProps & IAppBarCallProps;

const AppBar = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case Variant.Main:
            // return null;
            return (
                <MainAppBar {...rest}/>
            );

        case Variant.Workspace:
            return (
                <WorkspaceAppBar {...rest}/>
            );

        default:
            throw new Error(`Invalid variant(${variant}) for ${nameof(AppBar)}`);
    }
};

export { AppBar, IAppBarProps, IAppBarCallProps };
