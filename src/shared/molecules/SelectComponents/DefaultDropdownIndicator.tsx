import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { IndicatorProps } from "react-select/src/components/indicators";

import { makeStyles } from "@material-ui/core";

import { ChevronDownIcon, ChevronUpIcon } from "@icons";
import { IFieldOption } from "./types";

const useStyles = makeStyles((theme) => ({
    default: {
        color: theme.content.primary,
    },
    active: {
        color: theme.palette.primary.main,
    },
    disabled: {
        color: theme.disabled.main,
    },
    error: {
        borderColor: theme.palette.error.main,
    },
}));

type Props = IndicatorProps<IFieldOption>;

const DefaultDropdownIndicator: FunctionComponent<Props> = (props: Props) => {
    const { selectProps: { menuIsOpen, isDisabled, readOnly }, isFocused } = props;

    const classes = useStyles();

    if (readOnly) {
        return null;
    }

    let className = classes.default;
    if (isFocused) {
        className = classes.active;
    }
    if (isDisabled) {
        className = classes.disabled;
    }

    return (
        <components.DropdownIndicator {...props}>
            {menuIsOpen
                ? <ChevronUpIcon className={className}/>
                : <ChevronDownIcon className={className}/>
            }
        </components.DropdownIndicator>
    );
};

export { DefaultDropdownIndicator };
