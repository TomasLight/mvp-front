import React, { FunctionComponent, useMemo, useState, FocusEvent } from "react";
import { FieldRenderProps } from "react-final-form";
import { ActionMeta, ActionTypes, InputActionMeta } from "react-select/src/types";

import { IFieldOption, FieldOptionEnum } from "@shared/molecules/SelectComponents/types";

import { ISingleSelectProps, SingleSelect } from "@shared/templates";
import { FieldOptionsFactory } from "./Factories";
import { FormFieldManager, SelectStateFieldManager } from "../managers";

interface ISelectFormFieldProps {
    optionType?: FieldOptionEnum;
    sideOnChange?: (value: any, actionType?: ActionTypes) => void;
    clearOnBlur?: boolean;
}

type Props =
    FieldRenderProps<any, HTMLInputElement>
    & ISingleSelectProps
    & ISelectFormFieldProps;

const SelectFormField: FunctionComponent<Props> = (props: Props) => {
    const {
        input: { name, onChange, onFocus, onBlur, value, ...restInput },
        sideOnChange,
        options,
        meta,
        optionType = FieldOptionEnum.SelectFieldOption,
        onInputChange,
        clearOnBlur = false,
        ...rest
    } = props;

    const [ formManager ] = useState<FormFieldManager>(new FormFieldManager());
    const [ stateManager ] = useState<SelectStateFieldManager>(
        new SelectStateFieldManager(FieldOptionsFactory.make(optionType))
    );
    const [ stateValue, setStateValue ] = useState<any>(value);
    const [ isInputChanged, setIsInputChanged ] = useState<boolean>(false);

    const displayedValue: IFieldOption = useMemo(() => {
        const fieldOption = stateManager.getDisplayedSingleValue(options, value);

        if (!fieldOption.isEquals(stateValue)) {
            const selectedValue = fieldOption.getValue();
            setStateValue(selectedValue);
        }
        return fieldOption;
    }, [ options, value ]);

    const handleOnChange = (option: IFieldOption<any, any>, action: ActionMeta<any>) => {
        if (rest.readOnly || rest.disabled) {
            return;
        }

        const selectedOption = stateManager.getSelectedSingleOption(option, action);
        const selectedValue = selectedOption.getValue();

        setStateValue(selectedValue);
        onChange(selectedValue);
        if (typeof sideOnChange === "function") {
            sideOnChange(selectedValue, action.action);
        }

        setIsInputChanged(false);
    };

    // for validation on blur
    // if we start type, we should call onChange to trigger validation and
    // mark field as last focused
    const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
        setIsInputChanged(true);
        if (typeof onInputChange === "function" && actionMeta.action === "input-change") {
            onInputChange(newValue, actionMeta);
            // trigger for field validation
            onChange(stateValue);
        }
    };

    const handleOnBlur = (event: FocusEvent<any>) => {
        onBlur(event);
        if (typeof rest.onBlur === "function") {
            rest.onBlur(event);
        }
        if (clearOnBlur && isInputChanged) {
            const option = FieldOptionsFactory.make(optionType);
            handleOnChange(option.emptyOption(), { action: "clear" });
        }
        setIsInputChanged(false);
    };

    const areErrorsDisplayed = formManager.areErrorsDisplayed(meta);
    const shrink = stateManager.isSingleShrink(meta, displayedValue);

    return (
        <SingleSelect
            {...restInput}
            {...rest}

            active={meta.active}
            shrink={shrink}
            helperText={areErrorsDisplayed ? meta.error || meta.submitError : undefined}
            error={areErrorsDisplayed}

            options={options}
            getOptionLabel={(option: IFieldOption<any, any>) => option.title}
            getOptionValue={(option: IFieldOption<any, any>) => option.id.toString()}

            value={displayedValue}
            onChange={handleOnChange}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            onInputChange={handleInputChange}
        />
    );
};

export { SelectFormField };
