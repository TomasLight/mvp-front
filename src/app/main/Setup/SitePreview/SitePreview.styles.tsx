import React from "react";

import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "settings"

    | "shadow"
    | "browser"
    | "vk"
    | "color"
    ;

const styles = createStyles<ClassKey, {}>((theme) => ({
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
}));

export { ClassKey, styles };
