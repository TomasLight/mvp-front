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
import { correctClasses } from "./correctClasses";

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

export interface IFieldBaseProps<ClassKey extends string = string> extends IFieldBaseComponentProps {
    label?: string;
    htmlFor?: string;

    helperText?: string;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    isLoading?: boolean;

    classes?: FieldBaseClasses<ClassKey>;

    customEndAdornment?: ReactNode;
}

type Props<ClassKey extends string = string> = IFieldBaseProps<ClassKey>;

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

        classes,
        LabelProps,
        ErrorProps,
        LoadingIndicatorProps,
        ...rest
    } = props;

    const _classes = useStyles();
    correctClasses(classes);
    const helperTextId = getHelperTextId(htmlFor);
    const labelId = getLabelTextId(htmlFor);

    return (
        <div className={clsx(_classes.root, classes.root.root)} {...rest}>
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
};

export { FieldBase, Props as FieldBaseProps };
