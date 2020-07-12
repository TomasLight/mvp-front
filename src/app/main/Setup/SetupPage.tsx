import React, { useMemo } from "react";

import { IconButton, makeStyles } from "@material-ui/core";

import { ArrowLeftIcon } from "@icons";
import { FormProvider } from "@shared/organisms";
import { SitePreviewContainer } from "./SitePreview";
import { ISiteSettingsFormValues, setupSteps } from "./models";
import { DataSettingsFormContainer } from "./DataSettingsForm";
import { SiteSettingsFormContainer } from "./SiteSettingsForm";
import { SiteSettingsValidator } from "./validation";

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

const siteFormProvider = new FormProvider(
    new SiteSettingsValidator(),
    { resetValidationErrorOnActiveField: true }
);
const dataFormProvider = new FormProvider();

interface ISetupPageProps {
    setupStep: number;
    initialValues: Partial<ISiteSettingsFormValues>;
}

interface ISetupPageCallProps {
    redirectToBack: () => void;
    goToStepTwo: (formValues: ISiteSettingsFormValues) => void;
    goToStepThree: (formValues: any) => void;
}

type Props = ISetupPageProps & ISetupPageCallProps;

const SetupPage = (props: Props) => {
    const {
        setupStep,
        initialValues,
        redirectToBack,
        goToStepTwo,
        goToStepThree,
    } = props;
    const classes = useStyles();

    const SiteForm = useMemo(() => siteFormProvider.createForm(goToStepTwo), [ goToStepTwo ]);
    const DataForm = useMemo(() => dataFormProvider.createForm(goToStepThree), [ goToStepThree ]);

    const SettingsStep = () => (
        <div className={classes.root}>
            <div className={classes.left}>
                <IconButton onClick={redirectToBack} color="secondary">
                    <ArrowLeftIcon/>
                </IconButton>

                <SiteForm initialValues={initialValues}>
                    <SiteSettingsFormContainer onSubmit={siteFormProvider.submitOnClick}/>
                </SiteForm>
            </div>

            <SitePreviewContainer classes={{ root: classes.right }}/>
        </div>
    );

    const DataStep = () => (
        <div className={classes.root}>
            <div className={classes.left}>
                <DataForm>
                    <DataSettingsFormContainer onSubmit={dataFormProvider.submitOnClick}/>
                </DataForm>
            </div>
        </div>
    );

    switch (setupStep) {
        case setupSteps.siteSettings:
            return <SettingsStep/>;

        case setupSteps.dataSettings:
            return <DataStep/>;

        default:
            return null;
    }
};

export { SetupPage, ISetupPageProps, ISetupPageCallProps };
