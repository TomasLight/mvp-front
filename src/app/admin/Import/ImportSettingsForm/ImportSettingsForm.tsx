import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { makeStyles, Typography } from "@material-ui/core";

import { SiteItem } from "@admin/Site/SettingsForm/SiteItems";
import { IImportSettingsFormValues } from "@admin/Import/models";
import { Button } from "@shared/molecules/Button";
import { DragAndDropFormField } from "@shared/templates";
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
        width: "100%",
    },
}), { name: "DataSettingsForm" });

interface IImportSettingsFormProps {
    isSaving: boolean;
    pristine: boolean;
    buttonText: string;
    shouldDisplayStepperLabel: boolean;
}

interface IImportSettingsFormCallProps {
    onSubmit: () => void;
}

type Props = IImportSettingsFormProps & IImportSettingsFormCallProps;

const ImportSettingsForm = (props: Props) => {
    const {
        isSaving,
        pristine,
        buttonText,
        shouldDisplayStepperLabel,
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
                    name={nameof<IImportSettingsFormValues>(o => o.archive)}
                    subscription={DefaultFieldSubscription}
                    required
                    classes={{
                        root: {
                            root: classes.field,
                        },
                    }}
                    fileTypes={".zip"}
                />
            </SiteItem>

            <div className={classes.stepper}>
                {shouldDisplayStepperLabel && (
                    <Typography variant={"body1"} className={classes.stepperLabel}>
                        {Translate.getString("Шаг 2/3")}
                    </Typography>
                )}

                <Button
                    variant="form"
                    onClick={onSubmit}
                    className={classes.stepperButton}
                    state={{
                        loading: isSaving,
                        pristine,
                    }}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export { ImportSettingsForm, IImportSettingsFormProps, IImportSettingsFormCallProps };
