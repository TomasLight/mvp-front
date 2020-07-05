import React, { CSSProperties, FunctionComponent } from "react";
import { StylesConfig } from "react-select";

import { IFieldOption } from "@shared/molecules/SelectComponents/types";
import { FieldBaseProps } from "@shared/organisms/Fields/FieldBase";

import {
    DefaultClearIndicator,
    DefaultDropdownIndicator,
    DefaultPlaceholder,
    DefaultSingleOption,
    DefaultSingleValue,
    DefaultValueContainer,
} from "@shared/molecules/SelectComponents";
import { DefaultControl, DefaultMenuList } from "./components";
import { Select, ISelectProps } from "./Select";

interface ISingleSelectProps extends ISelectProps<IFieldOption>, FieldBaseProps {
    controlStyles?: CSSProperties;
}

type Props = ISingleSelectProps;

const SingleSelect: FunctionComponent<Props> = (props: Props) => {
    const { components, controlStyles, styles, ...rest } = props;

    const overriddenSelectComponentStyles: StylesConfig = {
        control: () => (controlStyles),
        singleValue: () => ({}),
        ...styles,
    };

    return (
        <Select
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
                SingleValue: DefaultSingleValue,
                ValueContainer: DefaultValueContainer,
                ...components,
            }}
        />
    );
};

export { SingleSelect, ISingleSelectProps };
