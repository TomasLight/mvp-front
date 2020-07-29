import { FormApi, FormState, FormSubscription } from "final-form";
import React, { KeyboardEvent, ReactNode } from "react";
import { Form as FinalForm } from "react-final-form";

import { FormMutators } from "./FormMutators";
import { Submit } from "./Submit";

interface IFormOwnProps {
    setFormApi: (api: FormApi) => void;
    submit: Submit;
    mutators?: FormMutators;
    validateAsync?: (formValues: any) => any;
}

type RenderProp<TModel> = (state: Partial<FormState<TModel>>) => ReactNode;

interface IFormProps<TModel = any> {
    initialValues?: TModel;
    className?: any;
    children?: RenderProp<TModel> | ReactNode;
    subscribe?: FormSubscription;
}

type Props = IFormOwnProps & IFormProps;

const Form = (props: Props) => {
    const { submit, children, setFormApi, className, subscribe = {}, ...rest } = props;

    const subscription: FormSubscription = {
        submitting: true,
        ...subscribe,
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
            subscription={subscription}
            {...rest}
        >
            {({ handleSubmit, form, ...restState }) => {
                setFormApi(form);

                return (
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress(handleSubmit)}
                        className={className}
                        noValidate
                    >
                        {typeof children === "function"
                            ? children(restState)
                            : children
                        }
                    </form>
                );
            }}
        </FinalForm>
    );
};

export { Form, IFormOwnProps, IFormProps };
