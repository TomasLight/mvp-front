import React, { FC } from "react";
import { components } from "react-select";
import { IndicatorProps } from "react-select/src/components/indicators";

import { makeStyles } from "@material-ui/core";

import { ChevronDownIcon, ChevronUpIcon } from "@icons";
import { IFieldOption } from "../../types";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
    },
    default: {
        color: "#000000",
    },
    // active: {
    //     color: theme.palette.primary.main,
    // },
    disabled: {
        color: "transparent",
    },
    // error: {
    //     borderColor: theme.palette.error.main,
    // },
}), { name: "DefaultDropdownIndicator" });

type Props = IndicatorProps<IFieldOption>;

const DefaultDropdownIndicator: FC<Props> = (props) => {
    const { selectProps: { menuIsOpen, isDisabled, readOnly }, isFocused } = props;

    const classes = useStyles();

    if (readOnly) {
        return null;
    }

    let className = classes.default;
    // if (isFocused) {
    //     className = classes.active;
    // }
    if (isDisabled) {
        className = classes.disabled;
    }

    return (
        <components.DropdownIndicator className={classes.root} {...props}>
            {menuIsOpen
                ? <ChevronUpIcon className={className}/>
                : <ChevronDownIcon className={className}/>
            }
        </components.DropdownIndicator>
    );
};

export { DefaultDropdownIndicator };
