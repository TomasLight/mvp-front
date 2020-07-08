import React from "react";
import { Field } from "react-final-form";

import { IRadioButtonFieldComponentProps, RadioButtonFieldComponent } from "./RadioButtonFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & IRadioButtonFieldComponentProps;

const FormField = (props) => (
    <Field
        component={RadioButtonFieldComponent}
        {...props}
    />
);

export { FormField };
