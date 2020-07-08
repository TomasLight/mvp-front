import { FormApi, Mutator } from "final-form";
import { setErrors } from "final-form-set-errors-mutator";

import { IFormPropsContainer } from "./IFormPropsContainer";
import { Submit } from "../Submit";
import { FormMutators } from "../FormMutators";

class FormPropsContainer implements IFormPropsContainer {
    public setFormApi: (api: FormApi) => void;
    public submit: Submit;
    public mutators: FormMutators;
    public submitAnyway: boolean;
    public validate: (formValues: any) => any;

    constructor(submit: Submit, setFormApi: (api: FormApi) => void) {
        this.submit = submit;
        this.setFormApi = setFormApi;
        this.mutators = {
            setErrors,
        };
        this.submitAnyway = false;
        this.validate = () => undefined;
    }

    public addMutator = (key: string, mutator: Mutator) => {
        this.mutators = {
            ...this.mutators,
            [key]: mutator,
        };
    };

    public build() {
        return {
            submit: this.submit,
            setFormApi: this.setFormApi,
            mutators: this.mutators,
            submitAnyway: this.submitAnyway,
            validate: this.validate,
        };
    }
}

export { FormPropsContainer };
