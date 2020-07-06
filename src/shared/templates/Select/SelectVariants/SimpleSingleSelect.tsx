import React, { FC } from "react";
import { StylesConfig } from "react-select";

import { DefaultSelectContainer, SelectWrapper } from "@shared/organisms/Fields/Select";
import {
    DefaultClearIndicator,
    DefaultDropdownIndicator,
    DefaultPlaceholder,
    DefaultSingleOption,
    DefaultSingleValue,
    DefaultValueContainer,
    DefaultControl,
    DefaultMenuList,
} from "@shared/organisms/Fields/Select/components";

import { ISingleSelectProps } from "./ISingleSelectProps";

type Props = ISingleSelectProps;

const SimpleSingleSelect: FC<Props> = (props) => {
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
                Option: DefaultSingleOption,
                Placeholder: DefaultPlaceholder,
                SelectContainer: DefaultSelectContainer,
                SingleValue: DefaultSingleValue,
                ValueContainer: DefaultValueContainer,
                ...components,
            }}
        />
    );
};

export { SimpleSingleSelect, Props as SimpleSingleSelectProps };
