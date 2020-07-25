import { Translate } from "@utils";
import React, { useEffect, useMemo } from "react";

import { makeStyles } from "@material-ui/core";

import { FormProvider } from "@shared/organisms";
import { PreviewContainer } from "./Preview";
import { ISiteSettingsFormValues } from "./models";
import { SettingsFormContainer } from "./SettingsForm";
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

const formProvider = new FormProvider(
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
    const Form = useMemo(() => formProvider.createForm(submitSettings), [ submitSettings ]);

    useEffect(() => {
        document.title = Translate.getString("Настройки сайта");
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Form initialValues={initialValues}>
                    <SettingsFormContainer onSubmit={formProvider.submitOnClick}/>
                </Form>
            </div>

            <PreviewContainer classes={{ root: classes.right }}/>
        </div>
    );
};

export { SitePage, ISitePageProps, ISitePageCallProps };
