import React from "react";
import { FieldRenderProps } from "react-final-form";

import { RadioGroup, IRadioGroupProps } from "@shared/organisms";
import { IFieldComponentCallProps } from "../IFieldComponentCallProps";
import { useHandleChangeOfFormRadio } from "../RadioButtonFormField/useHandleChangeOfFormRadio";

interface IRadioGroupFieldComponentProps extends IRadioGroupProps, IFieldComponentCallProps {
}
type Props = IRadioGroupFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const RadioGroupFieldComponent = (props: Props) => {
    const {
        input: { onChange, value },
        sideOnChange,
        meta,
        ...rest
    } = props;

    const handleOnChange = useHandleChangeOfFormRadio({
        onFieldChange: onChange,
        onValueChange: sideOnChange,
        readOnly: rest.readOnly,
        disabled: rest.disabled,
    });

    return (
        <RadioGroup
            {...rest}
            value={value}
            onChange={handleOnChange}
        />
    );
};

export { RadioGroupFieldComponent, IRadioGroupFieldComponentProps };
