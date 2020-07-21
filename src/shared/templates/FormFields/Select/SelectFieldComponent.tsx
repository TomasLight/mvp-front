import React, { useMemo, useState, FocusEvent } from "react";
import { FieldRenderProps } from "react-final-form";
import { ActionMeta, ActionTypes, InputActionMeta } from "react-select/src/types";

import { IFieldOption, FieldOptionVariant } from "@select/types";
import { Select, ISelectProps } from "@shared/templates/Select";
import { FieldOptionsFactory } from "./Factories";
import { FormFieldManager, SelectStateFieldManager } from "../managers";

interface ISelectFieldComponentProps extends ISelectProps {
    optionType?: FieldOptionVariant;
    sideOnChange?: (value: any, actionType?: ActionTypes) => void;
    clearOnBlur?: boolean;
}

type Props = ISelectFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const SelectFieldComponent = (props: Props) => {
    const {
        input: { name, onChange, onFocus, onBlur, value, ...restInput },
        sideOnChange,
        options,
        meta,
        optionType = FieldOptionVariant.SelectFieldOption,
        onInputChange,
        clearOnBlur = false,
        helperText,
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

    const getOptionLabel = (option: IFieldOption) => option.title;
    const getOptionValue = (option: IFieldOption) => option.id.toString();

    return (
        <Select
            {...restInput}
            {...rest}

            active={meta.active}
            shrink={shrink}
            helperText={areErrorsDisplayed ? meta.error || meta.submitError : helperText}
            error={areErrorsDisplayed}

            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}

            value={displayedValue}
            onChange={handleOnChange}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            onInputChange={handleInputChange}
        />
    );
};

export { SelectFieldComponent, ISelectFieldComponentProps };
