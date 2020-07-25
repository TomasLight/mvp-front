import React from "react";

import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"

    | "settings"
    | "settingsIcon"
    | "settingsTitle"
    | "browser"

    | "shadow"
    | "vk"
    | "color"
    ;

const styles = createStyles<ClassKey, {}>((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            '.' \
            'settings' '.' \
            'vk' '.' \
            'color' '.'",
        gridTemplateRows: "\
            68px \
            540px 124px \
            520px 80px \
            240px auto",
        height: "100%",
        alignItems: "center",
        justifyItems: "center",
    },

    settings: {
        gridArea: "settings",
        textAlign: "center",
        height: "100%",
        display: "grid",
        gridTemplateAreas: "'icon' '.' 'title' '.' 'browser'",
        gridTemplateRows: "auto 10px auto 36px auto 22px",
        justifyItems: "center",
    },
    settingsIcon: {
        gridArea: "icon",
        fontSize: 40,
    },
    settingsTitle: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
        color: "#000",
    },
    browser: {
        gridArea: "browser",
    },

    shadow: {
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12), -20px 20px 40px rgba(0, 0, 0, 0.12), 20px 20px 40px rgba(0, 0, 0, 0.12)",
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
        gridArea: "color",
    },
}));

export { ClassKey, styles };
