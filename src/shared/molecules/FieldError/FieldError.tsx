import clsx from "clsx";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    text: {
        position: "absolute",
        bottom: 0,
        display: "block",
        width: "100%",
        margin: 0,
        paddingTop: 12,
        boxSizing: "border-box",

        fontSize: 14,
        lineHeight: "20px",
    },
    errorText: {
        color: theme.palette.error.main,
    },
    helpText: {
        color: theme.content.primary,
    },

    hidden: {
        visibility: "hidden",
    },
}), { name: "FieldError" });

export interface IFieldErrorProps {
    id?: string;
    show: boolean;
    error: boolean;
    text: string;
}

type Props = IFieldErrorProps;

const FieldError: FunctionComponent<Props> = (props: Props) => {
    const {
        show,
        error,
        text,
        ...rest
    } = props;

    const classes = useStyles();
    const ref = useRef<HTMLDivElement>(null);
    const [ height, setHeight ] = useState<number>(0);

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }
        const typographyHeight = ref.current.offsetHeight;
        setHeight(typographyHeight);
    }, [ show, error, text ]);

    return (
        <Typography
            className={clsx(
                classes.text,
                error ? classes.errorText : classes.helpText,
                show ? "" : classes.hidden
            )}
            ref={ref}
            {...rest}
            style={{
                transform: `translate(0px, ${height}px)`,
            }}
        >
            {text}
        </Typography>
    );
};

export { FieldError };
