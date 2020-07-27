import React from "react";

import { Variant } from "../variant";
import { SiteFooter } from "./SiteFooter";

interface IFooterProps {
    siteName: string;
    variant: Variant;
}

type Props = IFooterProps;

const Footer = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case Variant.AdminNew:
            return null;

        case Variant.AdminEdit:
            return null;

        case Variant.Workspace:
            return (
                <SiteFooter {...rest}/>
            );

        default:
            throw new Error(`Invalid variant(${variant}) for ${nameof(Footer)}`);
    }
};

export { Footer, IFooterProps };
