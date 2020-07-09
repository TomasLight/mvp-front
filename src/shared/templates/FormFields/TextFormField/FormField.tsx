import React from "react";
import { Field } from "react-final-form";

import { ITextFieldComponentProps, TextFieldComponent } from "./TextFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & ITextFieldComponentProps;

const FormField = (props: Props) => (
    <Field
        component={TextFieldComponent}
        {...props}
    />
);

export { FormField };
