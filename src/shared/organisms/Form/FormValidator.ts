import { FormApi } from "final-form";
import { IValidator } from "model-state-validation";

import { FormSettings } from "./FormSettings";

export class FormValidator {
    private readonly validator: IValidator<any>;
    private readonly settings: FormSettings;
    private lastActiveFieldName: string | undefined;

    constructor(validator: IValidator<any>, settings: FormSettings) {
        this.validator = validator;
        this.settings = settings;
    }

    public validate(formApi: FormApi, values: any) {
        const {
            validateOnFieldsChange,
            resetValidationErrorOnActiveField,
            validateOnFieldsBlur,
            validateSpecifiedFieldsOnBlur,
        } = this.settings;

        if (!formApi) {
            return true;
        }

        if (validateOnFieldsChange) {
            return this.validateOnFieldsChange(formApi, values);
        }

        if (validateOnFieldsBlur) {
            return this.validateOnFieldsBlur(formApi, values);
        }

        if (validateSpecifiedFieldsOnBlur) {
            return this.validateSpecifiedFieldsOnBlur(formApi, values);
        }

        if (resetValidationErrorOnActiveField) {
            const { errors, active } = formApi.getState();
            return this.resetValidationErrorOnActiveField(errors, active);
        }

        return formApi.getState().errors;
    }

    private validateOnFieldsChange(formApi: FormApi, values: any) {
        const { active } = formApi.getState();
        const { resetValidationErrorOnActiveField } = this.settings;

        let validationErrors = this.validator.validate(values).getErrors();

        if (resetValidationErrorOnActiveField) {
            validationErrors = this.resetValidationErrorOnActiveField(validationErrors, active);
        }

        this.lastActiveFieldName = active;
        return validationErrors;
    }

    private validateOnFieldsBlur(formApi: FormApi, values: any) {
        const { active, errors } = formApi.getState();
        const { resetValidationErrorOnActiveField } = this.settings;

        let validationErrors = { ...errors };

        const isOnBlur = this.lastActiveFieldName !== undefined && active === undefined;
        if (isOnBlur) {
            const newErrors = this.validator.validate(values).getErrors();

            // correct error for blurred field
            validationErrors[this.lastActiveFieldName] = newErrors[this.lastActiveFieldName];
        }
        else if (resetValidationErrorOnActiveField) {
            validationErrors = this.resetValidationErrorOnActiveField(validationErrors, active);
        }

        this.lastActiveFieldName = active;
        return validationErrors;
    }

    private validateSpecifiedFieldsOnBlur(formApi: FormApi, values: any) {
        const { active, errors } = formApi.getState();
        const {
            resetValidationErrorOnActiveField,
            validateSpecifiedFieldsOnBlur,
        } = this.settings;

        let validationErrors = { ...errors };

        const isOnBlur = this.lastActiveFieldName !== undefined && active === undefined;
        if (isOnBlur && validateSpecifiedFieldsOnBlur &&
            validateSpecifiedFieldsOnBlur.some((fieldName: string) => fieldName === this.lastActiveFieldName)
        ) {
            const newErrors = this.validator.validate(values).getErrors();

            // correct error for blurred field
            validationErrors[this.lastActiveFieldName] = newErrors[this.lastActiveFieldName];
        }
        else if (resetValidationErrorOnActiveField) {
            validationErrors = this.resetValidationErrorOnActiveField(validationErrors, active);
        }

        this.lastActiveFieldName = active;
        return validationErrors;
    }

    private resetValidationErrorOnActiveField(errors: any, activeFieldName: string | undefined) {
        if (activeFieldName !== undefined) {
            return {
                ...errors,
                [activeFieldName]: undefined,
            };
        }

        return errors;
    }
}
