import React from "react";

import { createStyles } from "@material-ui/core";

type ClassKey =
    | "root"
    | "userName"
    | "image"
    | "title"
    | "siteUrl"
    ;

const styles = createStyles<ClassKey, { image: string }>({
    root: {
        display: "grid",
        height: "100%",
        background: "url(/images/vk-post_002.png) no-repeat",
        width: 560,
        gridTemplateAreas: "\
            '.' \
            'userName' '.' \
            'image' '.' \
            'title' '.'\
            'siteUrl'",
        gridTemplateRows: "\
            23.5px \
            15px 140.5px \
            228px 10px\
            19px 8px\
            15px",
    },
    userName: {
        gridArea: "userName",
        color: "#335984",
        fontWeight: 500,
        fontSize: 13,
        lineHeight: "15px",
        padding: "0 56px 0 96px",
    },
    image: {
        gridArea: "image",
        margin: "0 20px 0 20px",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        maxWidth: "calc(100% - 40px)", // width - margins
        height: "100%",

        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: props => `url(${props.image})`,
    },
    title: {
        gridArea: "title",
        color: "#000",
        fontSize: 16,
        lineHeight: "19px",
        padding: "0 35px 0 35px",
    },
    siteUrl: {
        gridArea: "siteUrl",
        color: "#939393",
        fontSize: 13,
        lineHeight: "15px",
        padding: "0 35px 0 35px",
    },
});
export { styles, ClassKey };
