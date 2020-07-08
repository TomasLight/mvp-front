import React, { FC } from "react";
import { Field } from "react-final-form";

import { RadioGroupFieldComponent, IRadioGroupFieldComponentProps } from "./RadioGroupFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & IRadioGroupFieldComponentProps;

const FormField: FC<Props> = (props) => (
    <Field
        component={RadioGroupFieldComponent}
        {...props}
    />
);

export { FormField };
