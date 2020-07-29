import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles
} from "@material-ui/core";

import { useForm } from "@shared/organisms/Form";
import { Translate } from "@utils/translates";
import { ContentPreviewContainer } from "./ContentPreview";
import { ContentSettingsFormContainer } from "./ContentSettingsForm";
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

interface ISetupPageProps {
    initialValues: IContactSettingsFormValues;

    showPublishDialog: boolean;
    siteUrl: string;
}

interface ISetupPageCallProps {
    loadData: () => void;
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
        loadData,
        submit,
        closePublishDialog,
        redirectToSite,
    } = props;

    const classes = useStyles();
    const [ Form, submitOnClick ] = useForm<IContactSettingsFormValues>(
        submit,
        new ContactSettingsValidator(),
        { resetValidationErrorOnActiveField: true }
    );

    useEffect(() => {
        document.title = Translate.getString("Настройки контента");
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Form initialValues={initialValues} subscribe={{ pristine: true }}>
                    {(state) => (
                        <ContentSettingsFormContainer
                            onSubmit={submitOnClick}
                            pristine={state.pristine}
                        />
                    )}
                </Form>
            </div>

            <ContentPreviewContainer classes={{ root: classes.right }}/>

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
