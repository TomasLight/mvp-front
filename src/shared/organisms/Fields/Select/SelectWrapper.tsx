import React, { CSSProperties, FC } from "react";
import ReactSelect, { Styles, Props as SelectProps } from "react-select";
import { SelectComponents } from "react-select/src/components";

import { IFieldOption } from "./types";
import { FieldBaseProps } from "../FieldBase";

interface ISelectWrapperProps<TOptions = any> extends SelectProps<TOptions>, FieldBaseProps {
    options: TOptions[];
    components?: Partial<SelectComponents<any>>;

    readOnly?: boolean;
    shrink?: boolean;

    name?: string;
    value?: any;
    styles?: Styles;
}

type Props = ISelectWrapperProps<IFieldOption>;

const SelectWrapper: FC<Props> = (props) => {
    const {
        id,
        input,
        styles,
        active,
        ...rest
    } = props;
    const isInteractive = !rest.readOnly && !rest.disabled;

    const overriddenStyles: Styles = {
        control: () => ({}), // none of react-select's styles are passed to <Control />
        menu: (provided: CSSProperties, state) => ({
            ...provided,
            zIndex: 2,
        }),
        option: () => ({
            height: "100%",
        }),
        indicatorsContainer: (provided: CSSProperties, state) => ({
            ...provided,
            "& > div" : {
                padding: 0,
            },
        }),
        valueContainer: () => ({}),
        input: (provided: CSSProperties, state) => ({
            ...provided,
            margin: 0,
            "& > div": {
                height: "100%",
            },
            "& input": {
                height: "100%",
            },
        }),

        ...styles,
    };

    return (
        <ReactSelect
            hideSelectedOptions={false}
            isSearchable={isInteractive}
            isClearable={false}
            inputId={id}
            htmlFor={id}

            {...input}
            {...rest}
            styles={overriddenStyles}
            // placeholder={""}
            isDisabled={rest.disabled}
            openMenuOnClick={isInteractive}
            isFocused={active && isInteractive}
        />
    );
};

export { SelectWrapper, ISelectWrapperProps, Props as SelectWrapperProps };
