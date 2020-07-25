import React from "react";

import {
    ButtonGroup as MuiButtonGroup,
    ButtonGroupProps as MuiButtonGroupProps
} from "@material-ui/core";

type Props = MuiButtonGroupProps;

const ButtonGroup = (props: Props) => {
    const { children, ...rest } = props;

    return (
        <MuiButtonGroup
            {...rest}
            variant="contained"
            color="primary"
        >
            {children}
        </MuiButtonGroup>
    );
};

export { ButtonGroup };
