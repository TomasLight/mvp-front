import { Translate } from "@utils";
import React, { useEffect, useMemo } from "react";

import { makeStyles } from "@material-ui/core";

import { FormProvider } from "@shared/organisms";
import { DataSettingsFormContainer } from "../Data/DataSettingsForm";

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
}), { name: "DataPage" });

const dataFormProvider = new FormProvider();

interface IDataPageProps {
    initialValues: Partial<any>;
}

interface IDataPageCallProps {
    submitSettings: (formValues: any) => void;
}

type Props = IDataPageProps & IDataPageCallProps;

const DataPage = (props: Props) => {
    const {
        initialValues,
        submitSettings,
    } = props;
    const classes = useStyles();

    useEffect(() => {
        document.title = Translate.getString("Импорт данных");
    }, []);

    const DataForm = useMemo(() => dataFormProvider.createForm(submitSettings), [ submitSettings ]);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <DataForm initialValues={initialValues}>
                    <DataSettingsFormContainer onSubmit={dataFormProvider.submitOnClick}/>
                </DataForm>
            </div>
        </div>
    );
};

export { DataPage, IDataPageProps, IDataPageCallProps };
