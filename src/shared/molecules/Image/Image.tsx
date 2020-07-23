import React, { ReactNode } from "react";
import { withStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { Classes } from "@utils";

type ClassKey =
    | "root"
    | "skeleton"
    ;

interface IImageProps {
    src?: string;
    animation: "pulse" | "wave" | false;
    classes?: Classes<ClassKey>;
    children?: ReactNode;
}

type Props = IImageProps;

const Image = (props: Props) => {
    const {
        classes,
        src,
        animation = false,
        children,
    } = props;

    if (src) {
        return (
            <div className={classes.root}>
                {children}
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Skeleton animation={animation} className={classes.skeleton}/>
            {children}
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey, {}, Props>({
    root: {
        overflow: "hidden",
        background: props => `center / cover url(${props.src}), rgba(0, 0, 0, 0.11)`,
    },
    skeleton: {
        height: "100%",
        width: "100%",
        transform: "none",
        borderRadius: 0,
    },
}, { name: "Image" })(Image);
export { componentWithStyles as Image };
