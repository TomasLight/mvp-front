import React from "react";

import { makeStyles, Button, Typography } from "@material-ui/core";

import { SiteItem } from "@main/Site/SettingsForm/SiteItems";
import { IDataSettingsFormValues } from "@main/Data/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { DragAndDropFormField, TextFormField } from "@shared/templates";
import { Translate } from "@utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            'item' \
            'stepper'",
        gridTemplateRows: "\
            1fr \
            auto",
        height: "100%",
        alignItems: "center",
    },
    item: {
        gridArea: "item",
    },
    field: {
        gridArea: "field",
    },
    stepper: {
        gridArea: "stepper",
        display: "grid",
        gridGap: 24,
        gridAutoFlow: "row",
    },
    stepperLabel: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    stepperButton: {
        backgroundColor: "#6FCF97",
        borderRadius: theme.borderRadius,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        padding: "12px 16px",
        width: "100%",
    },
}), { name: "DataSettingsForm" });

interface IDataSettingsFormProps {
}

interface IDataSettingsFormCallProps {
    onSubmit: () => void;
}

type Props = IDataSettingsFormProps & IDataSettingsFormCallProps;

const DataSettingsForm = (props: Props) => {
    const {
        onSubmit,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SiteItem
                className={classes.item}
                label={Translate.getString("Меню заведения")}
                help={Translate.getString("Выгрузка вашего каталога в виде .zip архива")}
            >
                <DragAndDropFormField
                    name={nameof<IDataSettingsFormValues>(o => o.archive)}
                    subscription={DefaultFieldSubscription}
                    required
                    classes={{
                        root: {
                            root: classes.field,
                        },
                    }}
                />
            </SiteItem>

            <div className={classes.stepper}>
                <Typography variant={"body1"} className={classes.stepperLabel}>
                    {Translate.getString("Шаг 2/3")}
                </Typography>

                <Button onClick={onSubmit} className={classes.stepperButton}>
                    {Translate.getString("Дальше")}
                </Button>
            </div>
        </div>
    );
};

export { DataSettingsForm, IDataSettingsFormProps, IDataSettingsFormCallProps };
