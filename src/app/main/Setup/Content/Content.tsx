import { IconVariant } from "@enums";
import { FavIcon } from "@icons";
import { BrowserContent } from "@main/Setup/Content/BrowserContent";
import { ColorContent } from "@main/Setup/Content/ColorContent";
import { VkPostContent } from "@main/Setup/Content/VkPostContent";
import clsx from "clsx";
import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

interface IContentProps {
    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;
    userName: string;
    openGraphImage: string;
    openGraphTitle: string;
    color: string;
}

type Props = IContentProps & StyledComponentProps<ClassKey>;

const Content = (props: Props) => {
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
            <BrowserContent
                classes={{
                    root: clsx(classes.browser, classes.shadow),
                }}
                faviconVariant={faviconVariant}
                siteName={siteName}
                siteUrl={siteUrl}
            />

            <VkPostContent
                classes={{
                    root: clsx(classes.vk, classes.shadow),
                }}
                userName={userName}
                image={openGraphImage}
                title={openGraphTitle}
                siteUrl={siteUrl}
            />

            <ColorContent
                classes={{
                    root: clsx(classes.color, classes.shadow),
                }}
                siteName={siteName}
                color={color}
            />
        </div>
    );
};

type ClassKey =
    | "root"
    | "settings"

    | "shadow"
    | "browser"
    | "vk"
    | "color"
    ;

const componentWithStyles = withStyles<ClassKey>((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            '.' \
            'settings' '.' \
            'browser' '.' \
            'vk' '.' \
            'delivery'",
        gridTemplateRows: "\
            50px \
            80px 55px \
            404px 124px\
            517px 100px\
            240px",
        height: "100%",
        alignItems: "center",
        justifyItems: "center",
    },
    settings: {
        gridArea: "settings",
    },

    shadow: {
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12), -20px 20px 40px rgba(0, 0, 0, 0.12), 20px 20px 40px rgba(0, 0, 0, 0.12)",
    },
    browser: {
        gridArea: "browser",
    },
    browserHeader: {
        gridArea: "browserHeader",
        display: "grid",
        gridTemplateColumns: "79px 18px 8px 164px",
        gridTemplateAreas: "'. favicon . siteName'",
        alignItems: "center",
    },
    favicon: {
        gridArea: "favicon",
        fontSize: 18,
    },
    siteName: {
        gridArea: "siteName",
        fontSize: 11,
        lineHeight: "13px",
    },
    siteUrl: {
        gridArea: "siteUrl",
        fontSize: 14,
        lineHeight: "16px",
        padding: "0 104px 0 161px",
    },

    vk: {
        gridArea: "vk",
    },
    color: {
        gridArea: "delivery",
    },
}), { name: "Content" })(Content);
export { componentWithStyles as Content, IContentProps, ClassKey };
