import clsx from "clsx";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { BizarreIcon } from "@icons";
import { Translate } from "@utils/translates";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'. name . work . bizarre .'",
        gridTemplateColumns: "1fr auto 20px auto 6px auto 1fr",
        backgroundColor: "#000",
        height: 42,
        alignItems: "center",
    },
    name: {
        gridArea: "name",
    },
    work: {
        gridArea: "work",
    },
    text: {
        color: "#fff",
        fontSize: 12,
        lineHeight: "14px",
    },
    bizarre: {
        gridArea: "bizarre",
        height: 12,
    },
}), { name: "Footer" });

interface ISiteFooterProps {
    siteName: string;
}

type Props = ISiteFooterProps;

const SiteFooter = (props: Props) => {
    const { siteName } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={clsx(classes.text, classes.name)}>
                {`©${new Date().getFullYear()}, ${siteName}`}
            </Typography>

            <Typography className={clsx(classes.text, classes.work)}>
                {Translate.getString("Работает на платформе")}
            </Typography>

            <BizarreIcon className={classes.bizarre} />
        </div>
    );
};

export { SiteFooter, ISiteFooterProps };
