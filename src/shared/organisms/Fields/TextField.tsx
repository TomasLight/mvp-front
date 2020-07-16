import clsx from "clsx";
import React from "react";

import {
    InputBaseComponentProps,
    FilledInput,
    FilledInputProps,
    FilledInputClassKey,
    makeStyles,
} from "@material-ui/core";

import { Guid } from "@utils";
import { FieldBase, FieldBaseProps, getHelperTextId } from "./FieldBase";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.borderRadius,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        width: "100%",
    },
    readonly: {
        "&:hover": {
            backgroundColor: "#F3F3F5",
            borderColor: "#F3F3F5",
            color: "#757575",
        },
        "&$readonlyFocused": {
            backgroundColor: "#F3F3F5",
            borderColor: "#F3F3F5",
            color: "#757575",
        },
    },
    readonlyFocused: {},
    inputReadonly: {
        cursor: "auto",
    },
}), { name: "TextField" });

interface ITextFieldProps extends FieldBaseProps<FilledInputClassKey> {
    id?: string;
    name?: string;
    value?: any;
    onChange?: (value: any) => void;
    InputProps?: Partial<FilledInputProps>;
    inputProps?: Partial<InputBaseComponentProps>;
}

type Props = ITextFieldProps;

const TextField = (props: Props) => {
    const {
        id = Guid.generate(),
        value,
        onChange,

        required = false,
        readonly = false,

        inputProps,
        InputProps = {},

        ...rest
    } = props;

    const helperTextId = getHelperTextId(id);
    const classes = useStyles();

    return (
        <FieldBase
            required={required}
            readonly={readonly}
            htmlFor={id}
            {...rest}
        >
            <FilledInput
                value={value}
                aria-describedby={helperTextId}
                id={id}
                required={required}
                inputProps={inputProps}
                error={rest.error}
                {...InputProps}
                onChange={onChange}
                disableUnderline
                classes={{
                    ...rest.classes.input,
                    root: clsx(
                        classes.root, {
                            [classes.readonly]: readonly,
                        },
                        rest.classes.input ? rest.classes.input.root : ""
                    ),
                    focused: clsx(
                        {
                            [classes.readonlyFocused]: readonly,
                        },
                        rest.classes.input ? rest.classes.input.focused : ""
                    ),
                    input: clsx(
                        {
                            [classes.inputReadonly]: readonly,
                        },
                        rest.classes.input ? rest.classes.input.input : ""
                    ),
                }}
                readOnly={readonly}
            />
        </FieldBase>
    );
};

export { TextField, ITextFieldProps, Props as TextFieldProps };
