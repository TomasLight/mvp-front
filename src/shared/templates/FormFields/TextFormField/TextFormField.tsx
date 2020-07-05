import React, { ChangeEvent, useState } from "react";
import {FieldRenderProps } from "react-final-form";

import { TextField, TextFieldProps } from "@shared/organisms/Fields/TextField";
import { FormFieldManager } from "../managers";

interface ITextFormFieldProps extends TextFieldProps {
    sideOnChange?: (value) => void;
}

type Props = ITextFormFieldProps & FieldRenderProps<any, HTMLInputElement>;

const TextFormField = (props: Props) => {
    const {
        input: { name, onChange, value, ...restInput },
        sideOnChange,
        meta,
        ...rest
    } = props;

    const [ formManager ] = useState<FormFieldManager>(new FormFieldManager());
    const areErrorsDisplayed = formManager.areErrorsDisplayed(meta);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (rest.readOnly || rest.disabled) {
            return;
        }

        onChange(event.target.value);
        if (typeof sideOnChange === "function") {
            sideOnChange(event.target.value);
        }
    };

    return (
        <TextField
            {...restInput}
            {...rest}

            helperText={areErrorsDisplayed ? meta.error || meta.submitError : rest.helperText}
            error={areErrorsDisplayed}

            value={value}
            inputProps={{
                ...restInput,
                ...rest.inputProps,
            }}
            InputProps={{
                name,
                ...rest.InputProps,
            }}
            onChange={handleOnChange}
        />
    );
};

export { TextFormField, ITextFormFieldProps }
