import React, { FC } from "react";

import {
    InputBaseComponentProps,
    FilledInput,
    FilledInputProps,
    withStyles,
} from "@material-ui/core";

import { Guid } from "@utils";
import { FieldBase, FieldBaseProps, getHelperTextId } from "./FieldBase";

const Input = withStyles((theme) => ({
    root: {
        borderRadius: theme.borderRadius,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        width: "100%",
    },
}))(FilledInput);

export interface ITextFieldProps extends FieldBaseProps {
    id?: string;
    name?: string;
    value?: any;
    onChange?: (value: any) => void;
    InputProps?: Partial<FilledInputProps>;
    inputProps?: Partial<InputBaseComponentProps>;
}

type Props = ITextFieldProps;

const TextField: FC<Props> = (props) => {
    const {
        id = Guid.generate(),
        value,
        onChange,

        required = false,

        inputProps,
        InputProps = {},

        ...rest
    } = props;

    const helperTextId = getHelperTextId(id);

    return (
        <FieldBase
            required={required}
            htmlFor={id}
            {...rest}
        >
            <Input
                value={value}
                aria-describedby={helperTextId}
                id={id}
                required={required}
                inputProps={inputProps}
                error={rest.error}
                {...InputProps}
                onChange={onChange}
                disableUnderline
            />
        </FieldBase>
    );
};

export { TextField, Props as TextFieldProps };
