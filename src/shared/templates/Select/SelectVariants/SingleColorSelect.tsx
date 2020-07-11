import React from "react";
import { StylesConfig } from "react-select";

import { DefaultSelectContainer, SelectWrapper } from "@shared/organisms/Fields/Select";
import {
    DefaultClearIndicator,
    DefaultDropdownIndicator,
    DefaultPlaceholder,
    DefaultValueContainer,
    SingleColorOption,
    SingleColorValue,
    ColorControl,
    DefaultMenuList,
} from "@shared/organisms/Fields/Select/components";

import { ISingleSelectProps } from "./ISingleSelectProps";

type Props = ISingleSelectProps;

const SingleColorSelect = (props: Props) => {
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
                Control: ColorControl,
                MenuList: DefaultMenuList,
                Option: SingleColorOption,
                Placeholder: DefaultPlaceholder,
                SelectContainer: DefaultSelectContainer,
                SingleValue: SingleColorValue,
                ValueContainer: DefaultValueContainer,
                ...components,
            }}
        />
    );
};

export { SingleColorSelect, Props as SingleColorSelectProps };
