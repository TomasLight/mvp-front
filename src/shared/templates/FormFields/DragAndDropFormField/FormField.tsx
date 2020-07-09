import React from "react";
import { Field } from "react-final-form";

import { IDragAndDropFieldComponentProps, DragAndDropFieldComponent } from "./DragAndDropFieldComponent";
import { IFormFieldProps } from "../IFormFieldProps";

type Props = IFormFieldProps & IDragAndDropFieldComponentProps;

const FormField = (props: Props) => (
    <Field
        component={DragAndDropFieldComponent}
        {...props}
    />
);

export { FormField };
