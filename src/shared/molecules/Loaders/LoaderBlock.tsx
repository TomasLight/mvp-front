import clsx from "clsx";
import React from "react";

import { CircularProgress, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.36)",
        display: "flex",
        height: "100%",
        position: "absolute",
        textAlign: "center",
        top: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    visible: {
        visibility: "visible",
    },
    hidden: {
        visibility: "hidden",
    },
    holder: {
        height: 60,
        width: 60,
    },
}));

interface ILoaderBlockProps {
    isLoading: boolean;
    className?: string;
    testId?: string;
}

type Props = ILoaderBlockProps;

const LoaderBlock = (props: Props) => {
    const { isLoading, className } = props;
    const classes = useStyles();

    const rootClasses = clsx(
        classes.root,
        isLoading ? classes.visible : classes.hidden,
        className
    );

    return (
        <div className={rootClasses}>
            <div className={classes.holder}>
                <CircularProgress color={"primary"}/>
            </div>
        </div>
    );
};

export { LoaderBlock };
