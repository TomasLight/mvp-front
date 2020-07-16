import clsx from "clsx";
import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IconVariant } from "@enums";
import { BrowserPreview } from "@main/Site/SitePreview/BrowserPreview";
import { ColorPreview } from "@main/Site/SitePreview/ColorPreview";
import { VkPostPreview } from "@main/Site/SitePreview/VkPostPreview";
import { styles, ClassKey } from "./SitePreview.styles";

interface ISitePreviewProps {
    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;
    userName: string;
    openGraphImage: string;
    openGraphTitle: string;
    color: string;
}

type Props = ISitePreviewProps & StyledComponentProps<ClassKey>;

const SitePreview = (props: Props) => {
    const {
        classes,
        faviconVariant,
        siteName,
        siteUrl,
        userName,
        openGraphImage,
        openGraphTitle,
        color,
    } = props;

    return (
        <div className={classes.root}>
            <BrowserPreview
                classes={{
                    root: clsx(classes.browser, classes.shadow),
                }}
                faviconVariant={faviconVariant}
                siteName={siteName}
                siteUrl={siteUrl}
            />

            <VkPostPreview
                classes={{
                    root: clsx(classes.vk, classes.shadow),
                }}
                userName={userName}
                image={openGraphImage}
                title={openGraphTitle}
                siteUrl={siteUrl}
            />

            <ColorPreview
                classes={{
                    root: clsx(classes.color, classes.shadow),
                }}
                siteName={siteName}
                color={color}
            />
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "SitePreview" }
)(SitePreview);
export { componentWithStyles as Content, ISitePreviewProps };
