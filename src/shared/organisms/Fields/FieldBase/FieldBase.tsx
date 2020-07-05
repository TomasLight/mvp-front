import React, { FunctionComponent, ReactNode } from "react";
import { FormControl, InputLabelProps, FormControlProps as MuiFormControlProps } from "@material-ui/core";

import { EndAdornment } from "@shared/atoms";
import {
    FieldError,
    IFieldErrorProps,
    FieldLoadingIndicator,
    IFieldLoadingIndicatorProps,
    FieldLabel,
} from "@shared/molecules";
import { Guid } from "@utils/Guid";

import {
    FieldProps,
} from "./FieldProps";
import { getHelperTextId } from "./getHelperTextId";
import { getLabelTextId } from "./getLabelTextId";

export interface IFieldBaseProps extends FieldProps {
    inputId?: string;
}

type Props = IFieldBaseProps & {
    className?: string;
    FormControlProps?: Partial<MuiFormControlProps>;
    FormHelperTextProps?: Partial<IFieldErrorProps>;
    InputLabelProps?: InputLabelProps;
    FieldLoadingIndicatorProps?: Partial<IFieldLoadingIndicatorProps>;
    customEndAdornment?: ReactNode;
};

const FieldBase: FunctionComponent<Props> = (props) => {
    const {
        inputId = Guid.generate(),
        label,
        helperText,

        children,

        disabled = false,
        error = false,
        required = false,
        isLoading = false,

        className,
        FormControlProps,
        FormHelperTextProps,
        InputLabelProps,
        FieldLoadingIndicatorProps,
        customEndAdornment,
    } = props;

    const helperTextId = getHelperTextId(inputId);
    const labelId = getLabelTextId(inputId);

    return (
        <FormControl
            className={className}
            {...FormControlProps}
            disabled={disabled}
            error={error}
            required={required}
            variant="outlined"
        >
            <FieldLabel
                label={label}
                InputLabelProps={InputLabelProps}
                inputId={inputId}
                id={labelId}
                disabled={disabled}
            />

            {children}

            {Boolean(customEndAdornment) && (
                <EndAdornment>
                    {customEndAdornment}
                </EndAdornment>
            )}

            <FieldError
                id={helperTextId}
                show={Boolean(helperText || error)}
                error={error}
                text={helperText}
                {...FormHelperTextProps}
            />

            <FieldLoadingIndicator
                isLoading={isLoading}
                right={17}
                {...FieldLoadingIndicatorProps}
            />
        </FormControl>
    );
};

export { FieldBase, Props as FieldBaseProps };
