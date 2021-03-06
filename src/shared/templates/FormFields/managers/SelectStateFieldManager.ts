import { FieldMetaState } from "react-final-form";
import { ActionMeta } from "react-select/src/types";

import { IFieldOption, isFieldOption } from "@select/types";

export class SelectStateFieldManager {
    private readonly optionInstance: IFieldOption;

    constructor(optionInstance: IFieldOption<any, any>) {
        this.optionInstance = optionInstance;
    }

    isEmptySingleValue = (valueOrOption: IFieldOption<any, any> | any): boolean => {
        if (isFieldOption(valueOrOption)) {
            return valueOrOption.isNullOrEmptySingle();
        }

        return this.optionInstance.isNullOrEmptySingleValue(valueOrOption);
    };

    getDisplayedSingleValue = (options: IFieldOption<any, any>[], value: any)
        : IFieldOption<any, any> => {

        if (this.isEmptySingleValue(value)) {
            return this.optionInstance.emptyOption();
        }

        const selectedOption: IFieldOption = options.find(
            (option: IFieldOption) => option.isEquals(value)
        );

        if (selectedOption !== undefined) {
            return selectedOption;
        }
        return this.optionInstance.emptyOption();
    };

    getSelectedSingleOption = (
        option: IFieldOption<any, any>,
        action: ActionMeta<any>
    ): IFieldOption<any, any> => {

        let selectedOption: IFieldOption;

        if (option == null || action.action === "clear") {
            selectedOption = this.optionInstance.emptyOption();
        }
        else {
            selectedOption = option;
        }

        return selectedOption;
    };

    isSingleShrink = (meta: FieldMetaState<any>, value: IFieldOption<any, any>): boolean => {
        return meta.active || meta.modified || !this.isEmptySingleValue(value);
    };
}
