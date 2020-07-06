import clsx from "clsx";
import React, { FC, ReactNode } from "react";

import { FormControl, makeStyles, withStyles } from "@material-ui/core";

import { EndAdornment } from "@shared/atoms";
import {
    FieldError,
    FieldLoadingIndicator,
    FieldLabel,
} from "@shared/molecules";
import { Guid } from "@utils";

import { RootClassKey, FieldBaseClasses } from "./FieldBaseClasses";
import { IFieldBaseComponentProps } from "./IFieldBaseComponentProps";
import { getHelperTextId } from "./getHelperTextId";
import { getLabelTextId } from "./getLabelTextId";

const useStyles = makeStyles<RootClassKey>({
    root: {
        display: "grid",
        gridAutoFlow: "row",
        gridGap: 8,
    },
    control: {
        position: "relative",
    },
});

export interface IFieldBaseProps extends IFieldBaseComponentProps {
    label?: string;
    htmlFor?: string;

    helperText?: string;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    isLoading?: boolean;

    classes?: FieldBaseClasses;

    customEndAdornment?: ReactNode;
}

type Props = IFieldBaseProps;

const FieldBase: FC<Props> = (props) => {
    const {
        htmlFor = Guid.generate(),
        label,
        helperText,
        children,
        customEndAdornment,

        disabled = false,
        error = false,
        required = false,
        isLoading = false,

        classes = {
            root: {},
            label: {},
            endAdornment: {},
            error: {},
            indicator: {},
        },
        LabelProps,
        ErrorProps,
        LoadingIndicatorProps,
    } = props;

    const _classes = useStyles();
    const helperTextId = getHelperTextId(htmlFor);
    const labelId = getLabelTextId(htmlFor);

    return (
        <div className={clsx(_classes.root, classes.root.root)}>
            <FieldLabel
                label={label}
                classes={classes.label}
                htmlFor={htmlFor}
                id={labelId}
                disabled={disabled}
                {...LabelProps}
            />

            <div className={clsx(_classes.control, classes.root.control)}>
                {children}

                {Boolean(customEndAdornment) && (
                    <EndAdornment classes={classes.endAdornment}>
                        {customEndAdornment}
                    </EndAdornment>
                )}

                <FieldLoadingIndicator
                    isLoading={isLoading}
                    right={17}
                    {...LoadingIndicatorProps}
                    classes={classes.indicator}
                />
            </div>

            <FieldError
                id={helperTextId}
                error={error}
                text={helperText}
                {...ErrorProps}
                classes={classes.error}
            />
        </div>
    );

    // return (
    //     <FormControl
    //         {...ControlProps}
    //         classes={classes.root}
    //         disabled={disabled}
    //         error={error}
    //         required={required}
    //         variant="outlined"
    //     >
    //         <FieldLabel
    //             label={label}
    //             InputLabelProps={LabelProps}
    //             classes={classes.label}
    //             htmlFor={htmlFor}
    //             id={labelId}
    //             disabled={disabled}
    //         />
    //
    //         {children}
    //
    //         {Boolean(customEndAdornment) && (
    //             <EndAdornment classes={classes.endAdornment}>
    //                 {customEndAdornment}
    //             </EndAdornment>
    //         )}
    //
    //         <FieldError
    //             id={helperTextId}
    //             error={error}
    //             text={helperText}
    //             {...ErrorProps}
    //             classes={classes.error}
    //         />
    //
    //         <FieldLoadingIndicator
    //             isLoading={isLoading}
    //             right={17}
    //             {...LoadingIndicatorProps}
    //             classes={classes.indicator}
    //         />
    //     </FormControl>
    // );
};

export { FieldBase, Props as FieldBaseProps };
