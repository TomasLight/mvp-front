import React, { FunctionComponent } from "react";

import { InputLabel, InputLabelProps, makeStyles, withStyles } from "@material-ui/core";

const Label = withStyles({
    shrink: {
        position: "relative",
        transform: "none",
    },
})(InputLabel);

interface IFieldLabelProps {
    label: string;
    inputId: string;
    id?: string;
    disabled?: boolean;
    InputLabelProps?: InputLabelProps;
}

type Props = IFieldLabelProps;

const FieldLabel: FunctionComponent<Props> = (props) => {
    const {
        label,
        inputId,
        id,
        disabled,
        InputLabelProps: {
            color,
            className,
            ...rest
        } = {
            color: "default",
            className: "",
        },
    } = props;

    if (!label) {
        return null;
    }

    return (
        <Label
            {...rest}
            htmlFor={inputId}
            id={id}
            variant="standard"
            shrink
            disabled={disabled}
            className={className}
        >
            {label}
        </Label>
    );
};

export { FieldLabel };
