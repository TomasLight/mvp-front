import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { Divider, makeStyles, Typography } from "@material-ui/core";

import { SiteItem } from "@admin/Site/SettingsForm/SiteItems";
import { IImportSettingsFormValues } from "@admin/Import/models";
import { Button } from "@shared/molecules/Button";
import { DragAndDropFormField } from "@shared/templates";
import { Translate } from "@utils";

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            'title' \
            'divider' \
            'item' \
            '.' \
            'buttons'",
        gridTemplateRows: "\
            auto \
            auto \
            auto \
            1fr \
            auto",
        gridRowGap: 20,
        height: "100%",
        alignItems: "center",
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    divider: {
        gridArea: "divider",
    },
    item: {
        gridArea: "item",
    },
    field: {
        gridArea: "field",
    },
    buttons: {
        gridArea: "buttons",
        display: "grid",
        gridGap: 16,
        gridAutoFlow: "row",
    },
    button: {
        width: "100%",
    },
    skipLabel: {
        fontSize: 14,
        lineHeight: "20px",
    },
}, { name: "ImportSettingsForm" });

interface IImportSettingsFormProps {
    isSaving: boolean;
    pristine: boolean;
    buttonText: string;
    isOptionalStep: boolean;
}

interface IImportSettingsFormCallProps {
    onSubmit: () => void;
    onSkip: () => void;
}

type Props = IImportSettingsFormProps & IImportSettingsFormCallProps;

const ImportSettingsForm = (props: Props) => {
    const {
        isSaving,
        pristine,
        buttonText,
        isOptionalStep,
        onSubmit,
        onSkip,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>
                {Translate.getString("Импорт данных")}
            </Typography>

            <Divider className={classes.divider}/>

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

            <div className={classes.buttons}>
                <Button
                    variant="form"
                    onClick={onSubmit}
                    className={classes.button}
                    state={{
                        loading: isSaving,
                        pristine,
                    }}
                >
                    {buttonText}
                </Button>

                {isOptionalStep && (
                    <>
                        <Button
                            variant="form"
                            onClick={onSkip}
                            className={classes.button}
                            state={{
                                loading: isSaving,
                                alternative: true,
                            }}
                        >
                            {Translate.getString("Пропустить")}
                        </Button>

                        <Typography variant={"body1"} className={classes.skipLabel}>
                            {Translate.getString("Этот шаг необязательный, если вы нажмёте кнопку \"Пропустить\", то будет использовано меню из примера справа.")}
                        </Typography>
                    </>
                )}
            </div>
        </div>
    );
};

export { ImportSettingsForm, IImportSettingsFormProps, IImportSettingsFormCallProps };
