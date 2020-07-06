import React, { FC } from "react";

import {
    InputLabel,
    withStyles,
    StyledComponentProps,
} from "@material-ui/core";
import { InputLabelClassKey } from "@material-ui/core/InputLabel/InputLabel";

interface IFieldLabelProps {
    label?: string;
    htmlFor?: string;
    id?: string;
    disabled?: boolean;
}

type Props = IFieldLabelProps & StyledComponentProps<InputLabelClassKey>;

const FieldLabel: FC<Props> = (props) => {
    const { label, ...rest } = props;

    if (!label) {
        return null;
    }

    return (
        <InputLabel
            variant="standard"
            shrink
            {...rest}
        >
            {label}
        </InputLabel>
    );
};

const componentWithStyles = withStyles<InputLabelClassKey>((theme) => ({
    shrink: {
        position: "relative",
        transform: "none",
    },
    filled: {},
    disabled: {},
    root: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "19px",
        fontVariant: "small-caps",
        color: "#061727",
    },
    animated: {},
    asterisk: {},
    error: {},
    focused: {},
    formControl: {},
    marginDense: {},
    outlined: {},
    required: {},
}), { name: "FieldLabel" })(FieldLabel);
export {
    componentWithStyles as FieldLabel,
    IFieldLabelProps,
    InputLabelClassKey as FieldLabelClassKey,
};
