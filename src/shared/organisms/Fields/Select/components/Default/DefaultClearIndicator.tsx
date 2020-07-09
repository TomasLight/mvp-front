import React from "react";
import { IndicatorProps } from "react-select/src/components/indicators";

import { IconButton, makeStyles } from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import { IFieldOption } from "../../types";

const useStyles = makeStyles({
    padding: {
        padding: 6,
    },
});

type Props = IndicatorProps<IFieldOption>;

const DefaultClearIndicator = (props: Props) => {
    const { clearValue } = props;
    const classes = useStyles();
    return (
        <IconButton
            onClick={clearValue}
            className={classes.padding}
        >
            <Close/>
        </IconButton>
    );
};

export { DefaultClearIndicator };
