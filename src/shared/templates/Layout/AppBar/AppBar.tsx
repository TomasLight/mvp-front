import React, { FC } from "react";

import { Variant } from "../variant";
import { MainAppBar } from "./MainAppBar";
import { PosAppBar } from "./PosAppBar";

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

const AppBar: FC<Props> = (props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case Variant.Main:
            return (
                <MainAppBar {...rest}/>
            );

        case Variant.Pos:
            return (
                <PosAppBar {...rest}/>
            );

        default:
            throw new Error(`Invalid variant(${variant}) for ${nameof(AppBar)}`);
    }
};

export { AppBar, IAppBarProps, IAppBarCallProps };
