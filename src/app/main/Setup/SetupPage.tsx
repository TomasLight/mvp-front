import React, { useMemo } from "react";

import { IconButton, makeStyles } from "@material-ui/core";

import { ArrowLeftIcon } from "@icons";
import { FormProvider } from "@shared/organisms";
import { ContentContainer } from "./Content";
import { ISetupFormValues, setupSteps } from "./models";
import { SetupSettingsFormContainer } from "./SetupSettingsForm";
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
        display: "grid",
        gridGap: 10,
        justifyItems: "start",
        background: theme.palette.background.paper,
        padding: "12px 32px 60px 22px",
    },
    right: {
        gridArea: "right",
    },
}), { name: "SetupPage" });

const formProvider = new FormProvider(new SetupValidator());

interface ISetupPageProps {
    setupStep: number;
    initialValues: Partial<ISetupFormValues>;
}

interface ISetupPageCallProps {
    redirectToBack: () => void;
    next: (formValues: any) => void;
}

type Props = ISetupPageProps & ISetupPageCallProps;

const SetupPage = (props: Props) => {
    const { setupStep, initialValues, redirectToBack, next } = props;
    const classes = useStyles();

    const Form = useMemo(() => formProvider.createForm(next), [ next ]);

    const SettingsStep = () => (
        <div className={classes.root}>
            <div className={classes.left}>
                <IconButton onClick={redirectToBack} color="secondary">
                    <ArrowLeftIcon/>
                </IconButton>

                <Form initialValues={initialValues}>
                    <SetupSettingsFormContainer onSubmit={formProvider.submitOnClick}/>
                </Form>
            </div>

            <ContentContainer classes={{ root: classes.right }}/>
        </div>
    );

    const DataStep = () => (
        <div className={classes.root}>
            <div className={classes.left}>
                IIKO
            </div>
        </div>
    );

    const ContactStep = () => (
        <div className={classes.root}>
            <div className={classes.left}>
                contacts
            </div>
        </div>
    );

    switch (setupStep) {
        case setupSteps.siteSettings:
            return <SettingsStep/>;

        case setupSteps.dataSettings:
            return <DataStep/>;

        case setupSteps.contactSettings:
            return <ContactStep/>;

        default:
            throw new Error(`Invalid setup step(${setupStep}) for ${nameof(SetupPage)}`);
    }
};

export { SetupPage, ISetupPageProps, ISetupPageCallProps };
