import React, { FunctionComponent } from "react";

import { InputBaseComponentProps, FilledInput, FilledInputProps, withStyles } from "@material-ui/core";

import { Guid } from "@utils/Guid";
import { FieldBase, FieldBaseProps, getHelperTextId } from "./FieldBase";

const Input = withStyles((theme) => ({
    root: {
        borderRadius: theme.borderRadius,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
    },
    input: {
        padding: "12px 16px",
    },
}))(FilledInput);

export interface ITextFieldProps extends FieldBaseProps {
    value?: any;
    onChange?: (value: any) => void;
    InputProps?: Partial<FilledInputProps>;
    inputProps?: Partial<InputBaseComponentProps>;
}

type Props = ITextFieldProps;

const TextField: FunctionComponent<Props> = (props) => {
    const {
        id = Guid.generate(),
        value,
        onChange,

        disabled = false,
        error = false,
        required = false,

        inputProps,
        InputProps = {},

        ...rest
    } = props;

    const helperTextId = getHelperTextId(id);

    return (
        <FieldBase
            disabled={disabled}
            error={error}
            required={required}
            inputId={id}
            {...rest}
        >
            <Input
                value={value}
                aria-describedby={helperTextId}
                id={id}
                required={required}
                inputProps={inputProps}
                {...InputProps}
                onChange={onChange}
                disableUnderline
            />
        </FieldBase>
    );
};

export { TextField, Props as TextFieldProps };
