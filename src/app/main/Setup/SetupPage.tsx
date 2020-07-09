import React, { useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { FormProvider } from "@shared/organisms";
import { Content } from "./Content";
import { ISetupFormValues } from "./models";
import { SetupFormContainer } from "./SetupForm";
import { SetupValidator } from "./validation";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'left right'",
        gridTemplateColumns: "440px 1fr",
        height: "100%",
    },
    left: {
        gridArea: "left",
        background: theme.palette.background.paper,
        padding: "60px 32px 60px 22px",
    },
    right: {
        gridArea: "right",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
    },
}), { name: "SetupPage" });

const formProvider = new FormProvider(new SetupValidator());

interface ISetupPageProps {
    initialValues: Partial<ISetupFormValues>;
}

interface ISetupPageCallProps {
    next: (formValues: any) => void;
}

type Props = ISetupPageProps & ISetupPageCallProps;

const SetupPage = (props: Props) => {
    const { initialValues, next } = props;
    const classes = useStyles();

    const Form = useMemo(() => formProvider.createForm(next), [next]);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Form initialValues={initialValues}>
                    <SetupFormContainer onSubmit={formProvider.submitOnClick} />
                </Form>
            </div>

            <Content classes={{ root: classes.right }}/>
        </div>
    );
};

export { SetupPage, ISetupPageProps, ISetupPageCallProps };
