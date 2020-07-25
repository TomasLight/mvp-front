import React, { Fragment, SyntheticEvent, useCallback } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";

import { Button, ButtonProps } from "@shared/molecules/Button";
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

    const handleClick = useCallback((event: SyntheticEvent) => {
        const sizeData = event.currentTarget.getAttribute(
            nameof<ButtonProps>(o => o.data)
        );

        const size = parseInt(sizeData, 10);
        changeSelectedSize(size);
    }, [changeSelectedSize]);

    return (
        <div className={clsx(classes.root, className)}>
            {sizes.map((size) => (
                <Fragment key={`size-${size}`}>
                    <Button
                        variant="size"
                        onClick={handleClick}
                        data={size}
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
