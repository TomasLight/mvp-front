import React from "react";
import { Field } from "react-final-form";

import { ISelectFieldComponentProps, SelectFieldComponent } from "./SelectFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & ISelectFieldComponentProps;

const FormField = (props: Props) => (
    <Field
        component={SelectFieldComponent}
        {...props}
    />
);

export { FormField };
