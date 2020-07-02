import React, { FC } from "react";

import { Button, ButtonClassKey, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface IFilterButtonProps {
    classes: Partial<ClassNameMap<ButtonClassKey>>,
    isActive: boolean;
}

interface IFilterButtonCallProps {
    onClick: () => void;
}

type Props = IFilterButtonProps & IFilterButtonCallProps;

const FilterButton: FC<Props> = (props) => {
    const { classes, isActive, onClick, children } = props;

    return (
        <Button
            classes={classes}
            variant={isActive ? "contained" : "text"}
            color="secondary"
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const componentWithStyles = withStyles({
    root: {
        borderRadius: 36,
        padding: "6px 12px",
    },
}, { name: nameof(FilterButton) })(FilterButton);
export { componentWithStyles as FilterButton };

