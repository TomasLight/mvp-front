import React, { FC } from "react";
import { Field } from "react-final-form";

import { ISelectFieldComponentProps, SelectFieldComponent } from "./SelectFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & ISelectFieldComponentProps;

const FormField: FC<Props> = (props) => (
    <Field
        component={SelectFieldComponent}
        {...props}
    />
);

export { FormField };
