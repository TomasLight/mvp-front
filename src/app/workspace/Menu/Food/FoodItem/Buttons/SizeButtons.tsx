import React, { Fragment } from "react";
import clsx from "clsx";

import { Button, makeStyles } from "@material-ui/core";

import { Translate } from "@utils/translates";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[0],
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: (props: Props) => `repeat(${props.sizes.length}, auto 1px)`,
        borderRadius: theme.borderRadius,
    },
    button: {
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[0],
        color: "#000",
        borderRadius: 0,

        "&:last-of-type": {
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
        },
        "&:first-of-type": {
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
        },
    },
    active: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 8px 36px rgba(0, 0, 0, 0.17)",
        borderRadius: theme.borderRadius,
        zIndex: 1,
        marginLeft: -1, // hack to hide a divider from left sid of button

        "&:hover": {
            backgroundColor: "#f8f8f8",
        },

        "& + $divider": {
            visibility: "hidden",
        },
    },
    divider: {
        height: 18,
        width: 1,
        backgroundColor: "#000",
        alignSelf: "center",
        "&:last-of-type": {
            display: "none",
        },
    },
}), { name: "SizeButtons" });

interface ISizeButtonsProps {
    className: string;
    sizes: number[];
    selectedSize: number;
    sizeType: number;
}

interface ISizeButtonsCallProps {
    changeSelectedSize: (size: number) => void;
}

type Props = ISizeButtonsProps & ISizeButtonsCallProps;

const SizeButtons = (props: Props) => {
    const {
        className,
        sizes,
        selectedSize,
        sizeType,
        changeSelectedSize,
    } = props;

    const classes = useStyles(props);

    const handleClick = (size: number) => () => {
        changeSelectedSize(size);
    };

    return (
        <div className={clsx(classes.root, className)}>
            {sizes.map((size) => (
                <Fragment key={`size-${size}`}>
                    <Button
                        size="medium"
                        className={clsx({
                            [classes.active]: size === selectedSize,
                        })}
                        classes={{
                            root: classes.button,
                        }}
                        onClick={handleClick(size)}
                    >
                        {Translate.getString("size", { size, sizeType })}
                    </Button>
                    <div className={classes.divider}/>
                </Fragment>
            ))}
        </div>
    );
};

export { SizeButtons };
