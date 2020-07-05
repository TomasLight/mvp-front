import React, { FC, PropsWithChildren, useRef, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    customAdornment: {
        position: "absolute",
        right: 8,
        display: "block",
        margin: 0,
        boxSizing: "border-box",
        zIndex: 1,
    },
}, { name: "EndAdornment" });

type Props = PropsWithChildren<any>;

const EndAdornment: FC<Props> = (props: Props) => {
    const {
        children,
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
    }, [ ref, ref.current ]);

    return (
        <div
            ref={ref}
            className={classes.customAdornment}
            style={{
                top: `calc(50% - ${(height / 2)}px)`,
            }}
        >
            {children}
        </div>
    );
};

export { EndAdornment };
