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

import { Form, FormPropsContainer, FormValidator, IFormProps } from "@shared/organisms";
import { FormSettings } from "@shared/organisms/Form/FormSettings";
import { Submit } from "@shared/organisms/Form/Submit";

export class FormProvider {
    private readonly validator: IValidator<any> | IValidatorAsync<any>;
    private readonly validateAsync: (model: any) => Promise<ModelState>;
    private readonly settings: FormSettings;

    private submit: Submit;
    private formApi: FormApi;
    private formProps: FormPropsContainer;

    constructor(validator: IValidator<any> | IValidatorAsync<any>, settings: FormSettings = {}) {
        this.validator = validator;
        if (isValidator(validator)) {
            this.validateAsync = (model: any) => Promise.resolve(validator.validate(model));
        }
        else if (isValidatorAsync(validator)) {
            this.validateAsync = (model: any) => validator.validateAsync(model);
        }

        this.settings = settings;
        this.submitOnClick = this.submitOnClick.bind(this);
    }

    createForm(submit: Submit) {
        this.submit = submit;
        const formValidator = new FormValidator(this.validator, this.settings);

        this.formProps = new FormPropsContainer(
            this.handleFormSubmit.bind(this),
            this.setFormApi.bind(this)
        );
        this.formProps.addMutator("setErrors", setErrors);
        this.formProps.validateAsync = (values: any) => formValidator.validate(this.formApi, values);

        const FormContainer: ComponentType<IFormProps> = connect(() => this.formProps.build())(Form);
        return FormContainer;
    }

    submitOnClick() {
        const model: any = {
            ...this.formApi.getState().values,
        };

        this.handleFormSubmit(model).then();
    }

    private async handleFormSubmit<TModel>(model: TModel) {
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
