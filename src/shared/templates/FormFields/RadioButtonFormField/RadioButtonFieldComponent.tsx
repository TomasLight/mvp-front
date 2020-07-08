import React, { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import { FormControl, makeStyles, Typography } from "@material-ui/core";

import { IRadioButtonFieldProps, RadioButtonField } from "@shared/organisms";
import { IFieldComponentCallProps } from "../IFieldComponentCallProps";
import { useHandleChangeOfFormRadio } from "./useHandleChangeOfFormRadio";

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.content.primary,
    },
}));

interface IRadioButtonFieldComponentProps extends IRadioButtonFieldProps, IFieldComponentCallProps {
    label?: string;
    id?: string;
}

type Props = IRadioButtonFieldComponentProps & FieldRenderProps<boolean, HTMLInputElement>;

const RadioButtonFieldComponent: FC<Props> = (props) => {
    const {
        input: { onChange, value, ...restInput },
        sideOnChange,
        meta,
        label,
        ...rest
    } = props;

    const classes = useStyles({});

    const handleOnChange = useHandleChangeOfFormRadio({
        onFieldChange: onChange,
        onValueChange: sideOnChange,
        readOnly: rest.readOnly,
        disabled: rest.disabled,
    });

    return (
        <FormControl fullWidth disabled={rest.disabled}>
            <Typography variant={"body1"} className={classes.label}>
                {label}
            </Typography>

            <RadioButtonField
                {...rest}
                value={value}
                onChange={handleOnChange}
            />
        </FormControl>
    );
};

export { RadioButtonFieldComponent, IRadioButtonFieldComponentProps };
