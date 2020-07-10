import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

interface IContentProps {
}

type Props = IContentProps & StyledComponentProps<ClassKey>;

const Content = (props: Props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <div className={classes.browser}>
                <img src={"/images/browser-chrome-mac-small_001.png"}/>
            </div>
        </div>
    );
};

type ClassKey =
    | "root"
    | "settings"
    | "browser"
    | "vk"
    | "delivery"
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
    },
    settings: {
        gridArea: "settings",
    },
    browser: {
        gridArea: "browser",
        "& img": {
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12), -20px 20px 40px rgba(0, 0, 0, 0.12), 20px 20px 40px rgba(0, 0, 0, 0.12)",
        },
    },
    vk: {
        gridArea: "vk",
    },
    delivery: {
        gridArea: "delivery",
    },
}), { name: "SetupPage" })(Content);
export { componentWithStyles as Content, IContentProps };
