import { FormApi, Mutator } from "final-form";
import { setErrors } from "final-form-set-errors-mutator";

import { IFormPropsContainer } from "./IFormPropsContainer";
import { Submit } from "../Submit";
import { FormMutators } from "../FormMutators";

class FormPropsContainer implements IFormPropsContainer {
    setFormApi: (api: FormApi) => void;
    submit: Submit;
    mutators: FormMutators;
    submitAnyway: boolean;
    validateAsync: (formValues: any) => Promise<any>;

    constructor(submit: Submit, setFormApi: (api: FormApi) => void) {
        this.submit = submit;
        this.setFormApi = setFormApi;
        this.mutators = {
            setErrors,
        };
        this.submitAnyway = false;
        this.validateAsync = () => Promise.resolve();
        this.build = this.build.bind(this);
    }

    addMutator = (key: string, mutator: Mutator) => {
        this.mutators = {
            ...this.mutators,
            [key]: mutator,
        };
    };

    build() {
        return {
            submit: this.submit,
            setFormApi: this.setFormApi,
            mutators: this.mutators,
            submitAnyway: this.submitAnyway,
            validate: this.validateAsync,
        };
    }
}

export { FormPropsContainer };
