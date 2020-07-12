import React, { useMemo } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from "@material-ui/core";

import { FormProvider } from "@shared/organisms";
import { Translate } from "@utils";
import { ContactPreviewContainer } from "./ContactPreview";
import { ContactSettingsFormContainer } from "./ContactSettingsForm";
import { IContactSettingsFormValues } from "./models";
import { ContactSettingsValidator } from "./validation";

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
        background: theme.palette.background.paper,
        padding: "12px 32px 60px 22px",
    },
    right: {
        gridArea: "right",
    },
}), { name: "SetupPage" });

const formProvider = new FormProvider(
    new ContactSettingsValidator(),
    { resetValidationErrorOnActiveField: true }
);

interface ISetupPageProps {
    initialValues: Partial<IContactSettingsFormValues>;

    showPublishDialog: boolean;
    siteUrl: string;
}

interface ISetupPageCallProps {
    submit: (formValues: IContactSettingsFormValues) => void;
    closePublishDialog: () => void;
    redirectToSite: () => void;
}

type Props = ISetupPageProps & ISetupPageCallProps;

const ContentPage = (props: Props) => {
    const {
        initialValues,
        showPublishDialog,
        siteUrl,
        submit,
        closePublishDialog,
        redirectToSite,
    } = props;
    const classes = useStyles();

    const ContactForm = useMemo(() => formProvider.createForm(submit), [ submit ]);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <ContactForm initialValues={initialValues}>
                    <ContactSettingsFormContainer onSubmit={formProvider.submitOnClick}/>
                </ContactForm>
            </div>

            <ContactPreviewContainer classes={{ root: classes.right }}/>

            <Dialog
                open={showPublishDialog}
                onClose={closePublishDialog}
            >
                <DialogTitle id="alert-dialog-title">
                    {Translate.getString("Успешная публикация")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {Translate.getString(`Ваш сайт опубликован по адресу ${siteUrl}. Желаете перейти?`)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePublishDialog} color="default" autoFocus>
                        {Translate.getString("Редактировать дальше")}
                    </Button>
                    <Button onClick={redirectToSite} color="primary" autoFocus>
                        {Translate.getString("Посетить сайт")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { ContentPage, ISetupPageProps, ISetupPageCallProps };
