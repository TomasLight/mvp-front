import { FieldSubscription } from "final-form";
import React from "react";
import { Field } from "react-final-form";

import { ITextFormFieldProps, TextFormField } from "./TextFormField";

interface IFormFieldProps {
    name: string;
    subscription?: FieldSubscription;
}

type Props = IFormFieldProps & ITextFormFieldProps;

const FormField = (props: Props) => (
    <Field
        component={TextFormField}
        {...props}
    />
);

export { FormField };
