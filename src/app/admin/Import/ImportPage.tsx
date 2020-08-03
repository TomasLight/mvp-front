import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useForm } from "final-form-app-form";

import { Translate } from "@utils/translates";
import { ImportSettingsFormContainer } from "./ImportSettingsForm";
import { ImportPreview } from "./ImportPreview";

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
    form: {
        width: "100%",
    },
}), { name: "DataPage" });

interface IDataPageProps {
    initialValues: Partial<any>;
}

interface IDataPageCallProps {
    submitSettings: (formValues: any) => void;
    skipImport: () => void;
}

type Props = IDataPageProps & IDataPageCallProps;

const ImportPage = (props: Props) => {
    const {
        initialValues,
        submitSettings,
        skipImport,
    } = props;
    const classes = useStyles();

    useEffect(() => {
        document.title = Translate.getString("Импорт данных");
    }, []);

    const [ Form, submitOnClick ] = useForm(submitSettings);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Form
                    initialValues={initialValues}
                    subscribe={{ pristine: true }}
                    className={classes.form}
                >
                    {(state) => (
                        <ImportSettingsFormContainer
                            onSubmit={submitOnClick}
                            onSkip={skipImport}
                            pristine={state.pristine}
                        />
                    )}
                </Form>
            </div>
            <ImportPreview classes={{ root: classes.right }}/>
        </div>
    );
};

export { ImportPage, IDataPageProps, IDataPageCallProps };
