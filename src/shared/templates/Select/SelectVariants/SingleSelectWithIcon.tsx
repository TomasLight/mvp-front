import React from "react";
import { StylesConfig } from "react-select";

import { DefaultSelectContainer, SelectWrapper } from "@shared/organisms/Fields/Select";
import {
    DefaultClearIndicator,
    DefaultDropdownIndicator,
    DefaultPlaceholder,
    DefaultValueContainer,
    SingleOptionWithIcon,
    SingleValueWithIcon,
    DefaultControl, DefaultMenuList
} from "@shared/organisms/Fields/Select/components";

import { ISingleSelectProps } from "./ISingleSelectProps";

type Props = ISingleSelectProps;

const SingleSelectWithIcon = (props: Props) => {
    const { components, controlStyles, styles, ...rest } = props;

    const overriddenSelectComponentStyles: StylesConfig = {
        control: () => (controlStyles),
        singleValue: () => ({}),
        ...styles,
    };

    return (
        <SelectWrapper
            {...rest}
            styles={overriddenSelectComponentStyles}
            components={{
                ClearIndicator: DefaultClearIndicator,
                DropdownIndicator: DefaultDropdownIndicator,
                LoadingIndicator: null,
                IndicatorSeparator: null,
                Control: DefaultControl,
                MenuList: DefaultMenuList,
                Option: SingleOptionWithIcon,
                Placeholder: DefaultPlaceholder,
                SelectContainer: DefaultSelectContainer,
                SingleValue: SingleValueWithIcon,
                ValueContainer: DefaultValueContainer,
                ...components,
            }}
        />
    );
};

export { SingleSelectWithIcon, Props as SingleSelectWithIconProps };
