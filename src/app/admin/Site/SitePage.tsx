import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm } from "final-form-app-form";

import { Translate } from "@utils/translates";
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

interface ISitePageProps {
    initialValues: ISiteSettingsFormValues;
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
    const [ Form, submitOnClick ] = useForm<ISiteSettingsFormValues>(
        submitSettings,
        new SiteSettingsValidator(),
        { resetValidationErrorOnActiveField: true }
    );

    useEffect(() => {
        document.title = Translate.getString("Настройки сайта");
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Form initialValues={initialValues} subscribe={{ pristine: true }}>
                    {(state) => (
                        <SettingsFormContainer
                            onSubmit={submitOnClick}
                            pristine={state.pristine}
                        />
                    )}
                </Form>
            </div>

            <PreviewContainer classes={{ root: classes.right }}/>
        </div>
    );
};

export { SitePage, ISitePageProps, ISitePageCallProps };
