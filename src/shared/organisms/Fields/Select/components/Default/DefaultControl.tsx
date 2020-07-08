import { Classes } from "@utils";
import clsx from "clsx";
import React, { FC } from "react";
import { components } from "react-select";
import { ControlProps as ControlComponentProps } from "react-select/src/components/Control";
import { Props as SelectProps } from "react-select/src/Select";

import { makeStyles } from "@material-ui/core";

import { FieldBase, FieldBaseProps } from "@shared/organisms/Fields/FieldBase";
import { IFieldOption } from "@select/types";

type ControlClassKey =
    | "root"
    | "focused"
    | "error"
    | "disabled";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#F3F3F5",
        color: "#757575",

        boxSizing: "border-box",
        width: "100%",
        cursor: "pointer",
        padding: "10px 16px",
        display: "flex",
        overflowX: "hidden",

        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#F3F3F5",
        borderRadius: theme.borderRadius,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,

        "&:hover": {
            backgroundColor: "#e0e0e0",
            borderColor: "#e0e0e0",
        },
    },
    focused: {
        backgroundColor: "#DBDBDB",
        borderColor: "#DBDBDB",
    },
    error: {
        backgroundColor: "#FBEFEE",
        borderColor: "#ECACA5",
    },
    disabled: {
        backgroundColor: "#F3F3F5",
        borderColor: "#F3F3F5",
    },
}));

interface IDefaultControlProps {
    selectProps?: SelectProps<IFieldOption> & FieldBaseProps<ControlClassKey>;
}

type Props = IDefaultControlProps & ControlComponentProps<IFieldOption>;

const DefaultControl: FC<Props> = (props) => {
    const {
        selectProps: {
            isFocused,

            htmlFor,
            label,
            helperText,
            customEndAdornment,

            disabled,
            error,
            required,
            isLoading,

            LabelProps,
            ErrorProps,
            LoadingIndicatorProps,
            classes: { input },
        },
        isDisabled,
    } = props;

    const classes = mergeClasses(useStyles(), input);

    const className = clsx(classes.root, {
        [classes.error]: Boolean(error),
        [classes.focused]: Boolean(isFocused),
        [classes.disabled]: Boolean(isDisabled),
    });

    return (
        <FieldBase
            htmlFor={htmlFor}
            label={label}
            helperText={helperText}
            customEndAdornment={customEndAdornment}

            disabled={disabled}
            error={error}
            required={required}
            isLoading={isLoading}

            LabelProps={LabelProps}
            ErrorProps={ErrorProps}
            LoadingIndicatorProps={LoadingIndicatorProps}
            classes={props.selectProps.classes}
        >
            <components.Control {...props} className={className}/>
        </FieldBase>
    );
};

function mergeClasses(classes1: Classes<ControlClassKey>, classes2: Classes<ControlClassKey>) {
    if (!classes2) {
        classes2 = {};
    }

    const classes: Classes<ControlClassKey> = {} as any;
    classes.root = clsx(classes1.root, classes2.root);
    classes.disabled = clsx(classes1.disabled, classes2.disabled);
    classes.error = clsx(classes1.error, classes2.error);
    classes.focused = clsx(classes1.focused, classes2.focused);

    return classes;
}

export { DefaultControl, IDefaultControlProps };
