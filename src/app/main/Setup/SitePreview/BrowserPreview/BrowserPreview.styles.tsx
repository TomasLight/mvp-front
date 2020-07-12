import React from "react";

import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "browserHeader"
    | "favicon"
    | "siteName"
    | "siteUrl"
    ;

const styles = createStyles<ClassKey, {}>({
    root: {
        display: "grid",
        height: "100%",
        background: "url(/images/browser-chrome-mac-small_002.png) no-repeat",
        width: 462,
        gridTemplateAreas: "\
        '.' 'browserHeader' \
        '.' 'siteUrl'",
        gridTemplateRows: "\
            15px 18px \
            16px 16px",
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
});
export { styles, ClassKey };
