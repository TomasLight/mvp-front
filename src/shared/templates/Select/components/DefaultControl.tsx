import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { ControlProps } from "react-select/src/components/Control";
import { Props as SelectProps } from "react-select/src/Select";

import { makeStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import { FieldBase, FieldBaseProps } from "@shared/organisms/Fields/FieldBase";
import { SelectFieldOption, IFieldOption } from "@shared/molecules/SelectComponents/types";

type ControlClassKey =
    | "root"
    | "focused"
    | "error"
    | "disabled";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
        padding: "0 8px",
        height: 52,
        display: "flex",
        overflowX: "hidden",

        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.background.default,
        borderRadius: 4,

        "&$focused": {
            borderColor: theme.palette.primary.main,
        },
        "&$error": {
            borderColor: theme.palette.error.main,
        },
        "&$disabled": {
            borderColor: theme.disabled.main,
            backgroundColor: theme.disabled.main,
        },
    },
    focused: {},
    error: {},
    disabled: {},
}), { name: "mui-select" });

export interface IDefaultControlProps extends FieldBaseProps {
    selectProps?: SelectProps<IFieldOption> & {
        classes?: Partial<ClassNameMap<ControlClassKey>>;
    };
}

type Props = ControlProps<SelectFieldOption> & IDefaultControlProps;

const DefaultControl: FunctionComponent<Props> = (props: Props) => {
    const {
        selectProps: {
            classes,
            isFocused,

            FieldProps = {},
            FormControlProps = {},
            FormHelperTextProps = {},
            InputLabelProps = {},
            FieldLoadingIndicatorProps = {},
        },
        isDisabled,
    } = props;

    const _classes = useStyles();
    let className = clsx({
        [_classes.root]: true,
        [_classes.error]: Boolean(FieldProps.error),
        [_classes.focused]: Boolean(isFocused),
        [_classes.disabled]: Boolean(isDisabled),
    });
    if (classes) {
        className = clsx(
            className,
            {
                [classes.root]: true,
                [classes.error]: Boolean(FieldProps.error),
                [classes.focused]: Boolean(isFocused),
                [classes.disabled]: Boolean(isDisabled),
            }
        );
    }

    return (
        <FieldBase
            {...FieldProps}

            FormControlProps={FormControlProps}
            InputLabelProps={{
                ...InputLabelProps,
                focused: isFocused,
            }}
            FormHelperTextProps={FormHelperTextProps}
            FieldLoadingIndicatorProps={FieldLoadingIndicatorProps}
        >
            <components.Control {...props} className={className}/>
        </FieldBase>
    );
};

export { DefaultControl };
