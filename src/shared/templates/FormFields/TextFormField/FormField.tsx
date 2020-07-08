import React, { FC } from "react";
import { Field } from "react-final-form";

import { ITextFieldComponentProps, TextFieldComponent } from "./TextFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & ITextFieldComponentProps;

const FormField: FC<Props> = (props) => (
    <Field
        component={TextFieldComponent}
        {...props}
    />
);

export { FormField };
