import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            'title' \
            'divider' \
            'photo' \
            'firstText' \
            'phone' \
            'address' \
            'time' \
            'link' \
            '.' \
            'button'",
        gridTemplateRows: "\
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            1fr \
            auto",
        gridGap: 20,
        // position: "fixed",
    },
    field: {
        width: "100%",
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    divider: {
        gridArea: "divider",
    },
    photo: {
        gridArea: "photo",
    },
    firstText: {
        gridArea: "firstText",
    },
    phone: {
        gridArea: "phone",
    },
    address: {
        gridArea: "address",
    },
    time: {
        gridArea: "time",
    },
    link: {
        gridArea: "link",
    },
    button: {
        width: "100%",
    },
}), { name: "ContentSettingsForm" });

export { useStyles };
