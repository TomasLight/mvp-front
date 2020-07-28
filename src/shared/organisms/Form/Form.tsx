import { FormApi, FormSubscription } from "final-form";
import React, { KeyboardEvent } from "react";
import { Form as FinalForm } from "react-final-form";

import { FormMutators } from "./FormMutators";
import { Submit } from "./Submit";

interface IFormOwnProps {
    setFormApi: (api: FormApi) => void;
    submit: Submit;
    mutators?: FormMutators;
    validateAsync?: (formValues: any) => any;
}

interface IFormProps<TModel = any> {
    children: any;
    initialValues?: TModel;
    className?: any;
}

type Props = IFormOwnProps & IFormProps;

const Form = (props: Props) => {
    const { submit, children, setFormApi, className, ...rest } = props;

    const formSubscription: FormSubscription = {
        submitting: true,
    };

    const onSubmit = (values: any) => submit(values);
    const onKeyPress = (handleSubmit) => (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <FinalForm
            onSubmit={onSubmit}
            subscription={formSubscription}
            {...rest}
        >
            {({ handleSubmit, form }) => {
                setFormApi(form);

                return (
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress(handleSubmit)}
                        className={className}
                        noValidate
                    >
                        {children}
                    </form>
                );
            }}
        </FinalForm>
    );
};

export { Form, IFormOwnProps, IFormProps };
