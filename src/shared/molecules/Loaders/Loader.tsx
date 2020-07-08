import clsx from "clsx";
import React, { FC } from "react";

import { CircularProgress, CircularProgressProps, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles(() => ({
    visible: {
        visibility: "visible",
    },
    hidden: {
        visibility: "hidden",
    },
}));

interface ILoaderBlockOwnProps {
    isLoading: boolean;
    className?: string;
    testId?: string;
}

type Props = ILoaderBlockOwnProps & CircularProgressProps;

const Loader: FC<Props> = (props) => {
    const classes = useStyles();
    const { isLoading, className, testId, ...rest } = props;

    const loaderClassName = clsx(
        isLoading ? classes.visible : classes.hidden,
        className
    );

    return (
        <CircularProgress className={loaderClassName} color={"primary"} {...rest}/>
    );
};

export { Loader, Props as LoaderProps };
