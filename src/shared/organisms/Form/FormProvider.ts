import { ComponentType } from "react";
import { connect } from "react-redux";
import { FormApi } from "final-form";
import { setErrors } from "final-form-set-errors-mutator";
import {
    IValidator,
    IValidatorAsync,
    isValidator,
    isValidatorAsync,
    ModelState,
} from "model-state-validation";

import { Form, IFormProps } from "./Form";
import { FormValidator} from "./FormValidator";
import { FormPropsContainer } from "./Props/FormPropsContainer";
import { FormSettings } from "@shared/organisms/Form/FormSettings";
import { Submit } from "@shared/organisms/Form/Submit";

type ModelConstraint = {
    [x: string]: any;
};

export class FormProvider<TModel extends ModelConstraint = any> {
    private readonly validator: IValidator<TModel> | IValidatorAsync<TModel>;
    private readonly validateAsync: (model: any) => Promise<ModelState>;
    private readonly settings: FormSettings;

    private submit: Submit;
    private formApi: FormApi;
    private formProps: FormPropsContainer;

    constructor(validator: IValidator<TModel> | IValidatorAsync<TModel> = null, settings: FormSettings = {}) {
        this.validator = validator;
        if (!validator) {
            this.validateAsync = (model: any) => Promise.resolve(new ModelState());
        }
        else if (isValidator(validator)) {
            this.validateAsync = (model: any) => Promise.resolve(validator.validate(model));
        }
        else if (isValidatorAsync(validator)) {
            this.validateAsync = (model: any) => validator.validateAsync(model);
        }

        this.settings = settings;

        this.submitOnClick = this.submitOnClick.bind(this);
        this.handleFormSubmitAsync = this.handleFormSubmitAsync.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    createForm(submit: Submit<TModel>) {
        this.submit = submit;

        this.formProps = new FormPropsContainer(
            this.handleFormSubmitAsync,
            this.setFormApi
        );
        this.formProps.addMutator("setErrors", setErrors);

        if (this.validator) {
            const formValidator = new FormValidator(this.validator, this.settings);
            this.formProps.validateAsync = (values: any) => formValidator.validate(this.formApi, values);
        }
        else {
            this.formProps.validateAsync = (values: any) => this.validateAsync(values);
        }

        const FormContainer: ComponentType<IFormProps<TModel>> = connect(this.formProps.build)(Form);
        return FormContainer;
    }

    submitOnClick() {
        const model: any = {
            ...this.formApi.getState().values,
        };

        this.handleFormSubmitAsync(model).then();
    }

    private async handleFormSubmitAsync(model: TModel) {
        const { setCommonErrorMessage } = this.settings;

        const modelState: ModelState = await this.validateAsync(model);
        const setErrors = (state: ModelState) => this.formApi.mutators.setErrors(state);

        if (modelState.isInvalid()) {
            const commonError = modelState.commonError;
            if (commonError && typeof setCommonErrorMessage === "function") {
                setCommonErrorMessage(commonError.error.toString());
            }
            setErrors(modelState);

            if (this.formProps.submitAnyway) {
                this.submit(model, false, setErrors);
            }
            return;
        }

        if (typeof setCommonErrorMessage === "function") {
            setCommonErrorMessage("");
        }
        this.formApi.mutators.setErrors(modelState);
        this.submit(model, true, setErrors);
    }

    private setFormApi(api: FormApi) {
        if (this.formApi !== api) {
            this.formApi = api;
        }
    }
}
