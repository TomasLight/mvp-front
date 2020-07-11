import React from "react";

import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "siteName"
    | "button"
    ;

const styles = createStyles<ClassKey, { color: string }>((theme) => ({
    root: {
        display: "grid",
        backgroundColor: (props) => props.color,
        height: 240,
        width: 320,
        gridTemplateAreas: "\
            '.' \
            'siteName' '.' \
            'button' '.'",
        gridTemplateRows: "\
            1fr \
            auto 10px \
            auto 1fr",
        justifyItems: "center",
        borderRadius: theme.borderRadius,
    },
    siteName: {
        gridArea: "siteName",
        color: theme.palette.primary.contrastText,
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    button: {
        gridArea: "button",
        padding: "6px 15px",
        borderRadius: theme.borderRadius,
        fontSize: 13,
        lineHeight: "15px",
    },
}));
export { styles, ClassKey };
