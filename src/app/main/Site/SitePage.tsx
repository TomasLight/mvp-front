import React, { useEffect, useMemo } from "react";

import { IconButton, makeStyles } from "@material-ui/core";

import { ArrowLeftIcon } from "@icons";
import { FormProvider } from "@shared/organisms";
import { SitePreviewContainer } from "./SitePreview";
import { ISiteSettingsFormValues } from "./models";
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

interface ISitePageProps {
    initialValues: Partial<ISiteSettingsFormValues>;
}

interface ISitePageCallProps {
    loadData: () => void;
    submitSettings: (formValues: ISiteSettingsFormValues) => void;
}

type Props = ISitePageProps & ISitePageCallProps;

const SitePage = (props: Props) => {
    const {
        initialValues,
        loadData,
        submitSettings,
    } = props;

    const classes = useStyles();
    const SiteForm = useMemo(() => siteFormProvider.createForm(submitSettings), [ submitSettings ]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <SiteForm initialValues={initialValues}>
                    <SiteSettingsFormContainer onSubmit={siteFormProvider.submitOnClick}/>
                </SiteForm>
            </div>

            <SitePreviewContainer classes={{ root: classes.right }}/>
        </div>
    );
};

export { SitePage, ISitePageProps, ISitePageCallProps };
